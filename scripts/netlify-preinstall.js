const fs = require('fs')
const { spawnSync } = require('child_process')

// Netlify does not support Github Packages (or other private package registries besides npm), options are:
//   - Commit .npmrc to repo - However, now we have a secret token inside our repo
//   - Environment variable in .npmrc - However, this requires all developer machines to have the same environment variable configured
//   - Get creative with the preinstall script... :)

// Only run this script on Netlify
console.log('running preinstall script')
if (process.env.NETLIFY === 'true') {
  // this is a default Netlify environment variable
  // Check if .npmrc already exists, if it does then do nothing (otherwise we create an infinite yarn loop)
  console.log('we are on netlify')
  if (!fs.existsSync('.npmrc')) {
    console.log('npmrc does not exist')
    // Create .npmrc
    fs.writeFileSync('.npmrc', `//registry.npmjs.org/:_authToken=${process.env.NPM_TOKEN}\nlegacy-peer-deps=true\n`)
    console.log('created npmrc')
    fs.chmodSync('.npmrc', 0o600)
    console.log('chmod on npmrc complete')
    // Run yarn again, because the yarn process which is executing
    // this script won't pick up the .npmrc file we just created.
    // The original yarn process will continue after this second yarn process finishes,
    // and when it does it will report "success Already up-to-date."
    spawnSync('npm', { stdio: 'inherit' })
    console.log('spawned npm')
  }
}

import { Popover, Transition } from '@headlessui/react'
import { I18n } from '@lingui/core'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React, { Fragment } from 'react'
import { classNames } from '../../functions/styling'
import ExternalLink from '../ExternalLink'
import NavLink from '../NavLink'
import { CodeIcon, ChatAlt2Icon, SpeakerphoneIcon, DocumentTextIcon  } from '@heroicons/react/outline'

const items = (i18n: I18n) => [
  {
    name: i18n._(t`Docs`),
    description: i18n._(t``),
    href: 'https://docs.radioshack.com',
    external: true,
    icon: <DocumentTextIcon
      className="w-5 h-5 mr-2"
      aria-hidden="true"
    />
  },
  {
    name: i18n._(t`Github`),
    description: i18n._(t``),
    href: 'https://github.com/radioshackdefi',
    external: true,
    icon: <CodeIcon
      className="w-5 h-5 mr-2"
      aria-hidden="true"
    />
  },
  {
    name: i18n._(t`Twitter`),
    description: i18n._(t``),
    href: 'https://twitter.com/radioshack',
    external: true,
    icon: <SpeakerphoneIcon
      className="w-5 h-5 mr-2"
      aria-hidden="true"
    />
  },
  {
    name: i18n._(t`Discord`),
    description: i18n._(t``),
    href: 'https://discord.gg/radioshack',
    external: true,
    icon: <ChatAlt2Icon
      className="w-5 h-5 mr-2"
      aria-hidden="true"
    />
  }
]

export default function Menu() {
  const { i18n } = useLingui()
  const solutions = items(i18n)

  return (
    <Popover className="relative ml-auto md:m-0">
      {({ open }) => (
        <>
          <Popover.Button
            className={classNames(
              open ? 'text-primary' : 'text-secondary',
              'focus:outline-none hover:text-high-emphesis'
            )}
          >
            <svg
              width="16px"
              height="16px"
              className="inline-flex items-center w-5 h-5 ml-2"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Popover.Button>

          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel
              static
              className="absolute z-50 max-w-xs px-2 mt-3 transform -translate-x-full bottom-12 lg:top-12 left-full sm:px-0"
            >
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative grid gap-6 px-5 py-6 bg-dark-900 sm:gap-8 sm:p-8">
                  {solutions.map((item) =>
                    item.external ? (
                      <ExternalLink
                        key={item.name}
                        href={item.href}
                        className="block p-3 -m-3 transition duration-150 ease-in-out rounded-md hover:bg-dark-800"
                        startIcon={item.icon}
                      >
                        <p className="text-base font-medium text-high-emphesis">{item.name}</p>
                        <p className="mt-1 text-sm text-secondary">{item.description}</p>
                      </ExternalLink>
                    ) : (
                      <NavLink key={item.name} href={item.href}>
                        <a className="block p-3 -m-3 transition duration-150 ease-in-out rounded-md hover:bg-dark-800">
                          <p className="text-base font-medium text-high-emphesis">{item.name}</p>
                          <p className="mt-1 text-sm text-secondary">{item.description}</p>
                        </a>
                      </NavLink>
                    )
                  )}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}

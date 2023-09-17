import * as React from 'react'

export function Hero(): JSX.Element {
  return (
    <section className="min-h-block-height items-end bg-primary md:grid md:grid-cols-2">
      <img
        alt=""
        className="h-full w-full object-cover"
        fetchPriority="high" // eslint-disable-line react/no-unknown-property -- new image property
        src="//source.unsplash.com/800x800"
      />

      <div className="px-6 py-10 md:-order-1">
        <h2 className="text-h1 mb-2 hyphens-auto">lorem ipsum dolor sit amet elit. Quisquam!</h2>

        <p className="text-body mb-8">
          Fusce tempor id nunc vitae ultrices. Vestibulum ante quam, faucibus dapibus dapibus a,
          interdum sit amet sapien. Pellentesque rutrum egestas semper. Quisque sed nulla turpis.
        </p>

        <a
          className="text-button inline-flex bg-default px-7 py-4 text-default-contrast transition-colors hover:bg-default-light disabled:bg-action-disabledBackground disabled:text-action-disabled disabled:shadow-none"
          href="#0"
        >
          Button
        </a>
      </div>
    </section>
  )
}

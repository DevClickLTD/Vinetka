import ExpandableInfoRow from "@/components/ExpandableInfoRow";

export default function CTA() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-10/10">
        <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 shadow-2xl sm:px-16">
          <ExpandableInfoRow />
          <svg
            viewBox="0 0 1024 1024"
            aria-hidden="true"
            className="absolute top-0 left-1/2 -z-10 size-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
          >
            <circle
              r={512}
              cx={512}
              cy={512}
              fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)"
              fillOpacity="0.7"
            />
            <defs>
              <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
                <stop stopColor="#803487" />
                <stop offset={1} stopColor="#803487" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}

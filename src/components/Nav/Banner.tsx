// components/CourseBanner.tsx
export default function Banner() {
  return (
    <div className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center py-2 px-4 text-sm">
      <div>
        <a href="/internship" className=" font-medium hover:text-gray-100">
        <span className="font-semibold">New Internship: </span>
        The Future of Genomics Is Single-Cell Genomics.{" "}
        <p className="underline inline-block">
          Enroll For the Internship Now
        </p>
        </a>
      </div>
    </div>
  )
}

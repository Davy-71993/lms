
import supabase from "@/lib/supabase"
import Link from 'next/link'

export default async function EnrolmentsPage() {
    const { data } = await supabase.from("courses").select("*,  modules(id)")
    const courses = data
  return (
    <div className="w-full grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto p-5">
        {
            courses?.map((course, index) => (
                <Link key={index} href={`/learn/${course.id}`}>
                    <div className="w-full h-full flex flex-col justify-between shadow-lg p-5 rounded-lg text-sky-900 bg-sky-50">
                        <h1 className="text-2xl font-bold text-center">{ course.title}</h1>
                        <p className="my-5 line-clamp-3">{ course.decription}</p>
                        
                        <div className="flex flex-wrap gap-3 border-t-2 pt-3 border-sky-900 justify-between">
                            <p className="w-fit px-5 py-1 bg-teal-600 rounded-2xl text-sky-100">{course.modules.length} Modules</p>
                            <p className="w-fit px-5 py-1 bg-teal-600 rounded-2xl text-sky-100">120 Enrolments</p>
                        </div>
                    </div>
                </Link>
            ))
        }
    </div>
  )
}

// import supabase from "@/lib/supabase"
// import Link from 'next/link'

// import Script from "next/script";

export default async function EnrolmentsPage() {
    // const { data } = await supabase.from("courses").select("*,  modules(id)")
    // const courses = data
  return (
    <div className="w-screen max-w-5xl mx-auto px-5 py-2">
        {/* {
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
        } */}
        <iframe src="https://koikoistories.h5p.com/content/1292496330719392027/embed" 
            className=" w-full min-w-full"
            aria-label="Learning on Occupational Health and Safety : The Felt Leadership Module" 
            style={{height:"90vh", width:"80vw"}} frameBorder="0" allowFullScreen={true} 
            allow="autoplay *; geolocation *; microphone *; camera *; midi *; encrypted-media *">
        </iframe>
        {/* <Script src="https://koikoistories.h5p.com/js/h5p-resizer.js"></Script> */}
    </div>
  )
}
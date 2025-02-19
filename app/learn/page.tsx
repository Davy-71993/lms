/**
 * This is the page, nothing much.
 * Just embeded the iframe content provided by Brian.
 * The srcipt tag is commented to avoid some kind of misbehavour.
 */

export default async function EnrolmentsPage() {
  return (
    <div className="w-screen max-w-5xl mx-auto px-5 py-2">
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
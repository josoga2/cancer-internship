export default function Youtube(){

    return(
        
        <main>
            <section className="hidden md:flex md:max-w-screen-lg md:m-auto md:items-center md:justify-between rounded-lg pt-10 px-10">
                
                <div className="max-w-full m-auto pb-10">
                    <iframe width="560" height="315" className="rounded-lg border-hbgreen-1 border-4" src="https://www.youtube.com/embed/I7-hxTbpscU?si=TVz-OZeJJVrX-XsS" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                    <p className="text-center pt-5 font-bold">Watch our Information Webinar </p>
                </div>
                
            </section>

            <section className="md:hidden p-5">
                <div className="max-w-full m-auto pb-10">
                    <iframe className="rounded-lg max-w-fit h-48 border-hbgreen-1 border-4" src="https://www.youtube.com/embed/I7-hxTbpscU?si=TVz-OZeJJVrX-XsS" title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                    <p className="text-center pt-5 font-bold">Watch our Information Webinar </p>
                </div>
            </section>
        </main>
    )
}
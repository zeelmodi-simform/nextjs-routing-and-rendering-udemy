import { notFound } from "next/navigation";

import ModalBackdrop from "@/components/ModalBackdrop";
import { getNewsItem } from "@/lib/news";

export default async function InterceptedImagePage({ params }) {
    
    const newsItemSlug = params.slug

    const newsItem = await getNewsItem(newsItemSlug);

    if (!newsItem) {
        notFound()
    }

    return (
        <>
            {/* <h2>Intercepted!</h2> */}
            <ModalBackdrop />
            <dialog className="modal" open>
                <div className='fullscreen-image'>
                    <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
                </div>
            </dialog>
        </>
    );
};

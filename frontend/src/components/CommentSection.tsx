

function CommentSection() {


    return (
        <>
            <div className="antialiased mx-auto max-w-screen-sm">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">Comments</h3>

                <div className="space-y-4">

                    <div className="flex">
                        <div className="flex-shrink-0 mr-3">
                            <img className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10" src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80" alt="" />
                        </div>
                        <div className="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
                            <strong>!!!!!!!!Commenter Username</strong> <span className="text-xs text-gray-400">!!!!!Time</span>
                            <p className="text-sm">
                                !!!!!!!Comment text
                            </p>
                            <div className="mt-4 flex items-center">
                                <div className="flex -space-x-2 mr-2">
                                    <img className="rounded-full w-6 h-6 border border-white" src="https://images.unsplash.com/photo-1554151228-14d9def656e4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80" alt="" />
                                        <img className="rounded-full w-6 h-6 border border-white" src="https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80" alt="" />
                                        </div>
                                        <div className="text-sm text-gray-500 font-semibold">
                                            !!!!!!!!#ofReplies
                                        </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex">
                            <div className="flex-shrink-0 mr-3">
                                <img className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10" src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80" alt="" />
                            </div>
                            <div className="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
                                <strong>!!!!!!!!Commenter Username</strong> <span className="text-xs text-gray-400">!!!!!!!!Comment Time</span>
                                <p className="text-sm">
                                    !!!!!!!Comment text
                                </p>

                                <h4 className="my-5 uppercase tracking-wide text-gray-400 font-bold text-xs">!!!!!!!!!!#ofReplies</h4>

                                <div className="space-y-4">
                                    <div className="flex">
                                        <div className="flex-shrink-0 mr-3">
                                            <img className="mt-3 rounded-full w-6 h-6 sm:w-8 sm:h-8" src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80" alt="" />
                                        </div>
                                        <div className="flex-1 bg-gray-100 rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
                                            <strong>!!!!!!!Commenter Username</strong> <span className="text-xs text-gray-400">!!!!!!!Comment Time</span>
                                            <p className="text-xs sm:text-sm">
                                                !!!!!!!!Comment Text
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className="flex-shrink-0 mr-3">
                                            <img className="mt-3 rounded-full w-6 h-6 sm:w-8 sm:h-8" src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80" alt="" />
                                        </div>
                                        <div className="flex-1 bg-gray-100 rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
                                            <strong>!!!!!!!!Commenter Username</strong> <span className="text-xs text-gray-400">!!!!!!Comment Time</span>
                                            <p className="text-xs sm:text-sm">
                                                !!!!!!!!!Comment Text
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    )
}

export default CommentSection;
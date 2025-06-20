import React, { useState } from 'react'
import { createShortUrl } from "../api/shortUrl.api"
// import { useSelector } from 'react-redux'
// import { QueryClient } from '@tanstack/react-query'
// import { queryClient } from '../main'

const UrlForm = () => {

    const [url, setUrl] = useState("www.google.com")
    const [shortUrl, setShortUrl] = useState()
    const [copied, setCopied] = useState(false)
    const [error, setError] = useState(null)
    // const [customSlug, setCustomSlug] = useState("")
    // const { isAuthenticated } = useSelector((state) => state.auth)

    const handleSubmit = async () => {
        try {
            const shortUrl = await createShortUrl(url);
            setShortUrl(shortUrl)
            //         queryClient.invalidateQueries({ queryKey: ['userUrls'] })
            //         setError(null)
        } catch (err) {
            setError(err.message)
        }
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(shortUrl);
        setCopied(true);

        // Reset the copied state after 2 seconds
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4 w-full">
            <div className="w-full max-w-lg">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">URL Shortener</h1>
                    <p className="text-gray-600 text-sm">Transform long URLs into clean, shareable links</p>
                </div>

                {/* Main Card */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
                    <div className="p-8">
                        <div className="space-y-6">
                            {/* URL Input */}
                            <div className="space-y-3">
                                <label htmlFor="url" className="block text-sm font-semibold text-gray-900">
                                    Enter URL to shorten
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0 9c0 5-4 9-9 9s-9-4-9-9m9 9c0-5 4-9 9-9s9 4 9 9" />
                                        </svg>
                                    </div>
                                    <input
                                        type="url"
                                        id="url"
                                        value={url}
                                        onInput={(event) => setUrl(event.target.value)}
                                        placeholder="https://example.com/very-long-url"
                                        required
                                        className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 bg-gray-50/50 hover:bg-white hover:border-gray-300 group"
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                onClick={handleSubmit}
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
                            >
                                <span className="flex items-center justify-center space-x-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    <span>Shorten URL</span>
                                </span>
                            </button>

                            {/* Error Message */}
                            {error && (
                                <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm animate-fade-in">
                                    <div className="flex items-center space-x-3">
                                        <div className="flex-shrink-0">
                                            <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-medium">Error</h3>
                                            <p className="mt-1">{error}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Custom Slug Input (commented) */}
                            {/* {isAuthenticated && (
                        <div className="space-y-3">
                            <label htmlFor="customSlug" className="block text-sm font-semibold text-gray-900">
                                Custom alias <span className="text-gray-500 font-normal text-xs">(optional)</span>
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    id="customSlug"
                                    value={customSlug}
                                    onChange={(event) => setCustomSlug(event.target.value)}
                                    placeholder="my-custom-link"
                                    className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 bg-gray-50/50 hover:bg-white hover:border-gray-300"
                                />
                            </div>
                        </div>
                    )} */}
                        </div>
                    </div>
                </div>

                {/* Result Card */}
                {shortUrl && (
                    <div className="mt-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden animate-fade-in">
                        <div className="p-6">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="flex-shrink-0">
                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">Success!</h3>
                                    <p className="text-sm text-gray-600">Your URL has been shortened</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="block text-sm font-medium text-gray-700">Shortened URL</label>
                                <div className="flex items-center bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                                    <input
                                        type="text"
                                        readOnly
                                        value={shortUrl}
                                        className={`flex-1 p-4 text-sm bg-transparent focus:outline-none select-all font-mono ${copied ? 'text-green-700' : 'text-gray-700'}`}
                                    />
                                    <button
                                        onClick={handleCopy}
                                        className={`px-6 py-4 text-sm font-semibold transition-all duration-200 ${copied
                                                ? 'bg-green-500 text-white hover:bg-green-600'
                                                : 'bg-gray-900 text-white hover:bg-gray-800'
                                            }`}
                                    >
                                        {copied ? (
                                            <div className="flex items-center space-x-2">
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                <span>Copied!</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center space-x-2">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                </svg>
                                                <span>Copy</span>
                                            </div>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Footer */}
                <div className="text-center mt-8">
                    <p className="text-xs text-gray-500">
                        Secure • Fast • Reliable
                    </p>
                </div>
            </div>
        </div>
    )
}

export default UrlForm
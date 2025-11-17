import React, { useEffect, useState } from 'react'
import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'
import 'prismjs/themes/prism.css'
import './App.css'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'
import { Sparkles } from 'lucide-react'

function App() {
    const [code, setCode] = useState('');
    const [review, setReview] = useState('');
    const [loader, setLoader] = useState(false);

    const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3999/ai/get-review';

    useEffect(() => {
        highlight(code, languages.js);
    }, [code]);

    const handleClick = async () => {
        setLoader(true);
        try {
            const res = await axios.post(API_URL, { code });
            setReview(res.data);
        } catch (error) {
            console.error("Error fetching review:", error);
            setReview("**Error:** Failed to get code review. Please try again later.");
        } finally {
            setLoader(false);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
            <div className="container mx-auto px-4 py-8">
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Sparkles className="w-8 h-8 text-blue-400" />
                        <h1 className="text-4xl font-bold text-white">AI Code Reviewer</h1>
                    </div>
                    <p className="text-gray-300">Get instant AI-powered code reviews and suggestions</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gray-800 rounded-lg shadow-xl p-6">
                        <h2 className="text-xl font-semibold text-white mb-4">Your Code</h2>
                        <Editor
                            value={code}
                            onValueChange={code => setCode(code)}
                            highlight={code => highlight(code, languages.js)}
                            padding={10}
                            style={{
                                fontFamily: '"Fira code", "Fira Mono", monospace',
                                fontSize: 14,
                                backgroundColor: '#1e293b',
                                borderRadius: '0.5rem',
                                minHeight: '400px',
                                color: '#e2e8f0'
                            }}
                            className="code-editor"
                        />
                    </div>

                    <div className="bg-gray-800 rounded-lg shadow-xl p-6">
                        <h2 className="text-xl font-semibold text-white mb-4">AI Review</h2>
                        <div className="bg-gray-900 rounded-lg p-4 min-h-[400px] overflow-auto">
                            {loader ? (
                                <div className="flex items-center justify-center h-full">
                                    <div className="loader"></div>
                                </div>
                            ) : (
                                <ReactMarkdown className="text-gray-300 prose prose-invert max-w-none">
                                    {review || '*Submit your code to get an AI review...*'}
                                </ReactMarkdown>
                            )}
                        </div>
                    </div>
                </div>

                <div className="text-center">
                    <button
                        onClick={handleClick}
                        disabled={!code || loader}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-lg"
                    >
                        {loader ? 'Analyzing...' : 'Review Code'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default App
import React from 'react'
import './App.css'
import "prismjs/themes/prism-tomorrow.css"
import prism from 'prismjs'
import Editor from 'react-simple-code-editor'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Markdown from 'react-markdown'
import { MagnifyingGlass } from 'react-loader-spinner'

function App() {
    const [code, setCode] = useState('');
    const [review, setReview] = useState('');
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        prism.highlightAll();
    }, [code]);

    const handleClick = async () => {
        setLoader(true);
        const res = await axios.post('http://localhost:3999/ai/get-review', { code });
        setReview(res.data);
        setLoader(false);
    }

    return (
        <>
            <main>
                <div className="left">
                    <div className="code">
                        <Editor
                            value={code}
                            onValueChange={code => setCode(code)}
                            highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
                            padding={10}
                            style={{
                                fontFamily: '"Fira Code", "Fira Mono", monospace',
                                fontSize: 20,
                                backgroundColor: "black",
                                borderRadius: "5px",
                                textShadow: "none",
                                height: "100%",
                                width: "100%",
                                color: "white",
                                overflow: "visible"
                            }}
                        />
                    </div>
                    <button className='review-btn' onClick={handleClick}>
                        Review
                    </button>
                    {loader && (
                        <div className="loader-wrapper">
                            <MagnifyingGlass
                                visible={true}
                                height="80"
                                width="80"
                                ariaLabel="magnifying-glass-loading"
                                wrapperStyle={{}}
                                wrapperClass="magnifying-glass-wrapper"
                                glassColor="#c0efff"
                                color="#e15b64"
                                />
                                <h2>Searching ...</h2>
                        </div>
                    )}
                </div>
                <div className="right">
                    <Markdown>
                        {review}
                    </Markdown>
                </div>
            </main>
        </>
    )
}

export default App
import React, { useEffect, useState } from 'react';
import {  Link } from 'react-router-dom';

const BlogDetail = () => {
    // const blogData = location.state || { photo: '', title: 'Blog Not Found', content: 'No content available.' };
    const [blogData, setBlogData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch(`https://urbanfarm.onrender.comget-blog?id=${window.location.pathname.split('/blog/')[1]}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setBlogData(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching plants:', error);
                setError(error.message);
                setLoading(false);
            }
        }
        fetchBlogs();
    })
    // const { photo, title, content } = blogData;

    if (loading) {
        return <div class="w-12 h-12 rounded-full animate-spin
        border border-solid border-black mt-20 mb-[70vh] mx-auto border-t-transparent"></div>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }


    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100">
            <header className="w-full bg-blue-600 text-white py-6 px-4 text-center shadow-md">
                <h1 className="text-4xl font-bold">{blogData.title}</h1>
                <p className="text-md mt-2 text-gray-200">A closer look at this blog post</p>
            </header>

            <div className="container max-w-5xl mx-auto mt-10 px-4 lg:flex lg:gap-8">
                <div className="w-full lg:w-3/4 bg-white p-6 rounded-lg shadow-lg mb-10 lg:mb-0">
                    {blogData.photoPath ? (
                        <img
                            src={`http://localhost:8080${blogData.photoPath}`}
                            alt={blogData.title}
                            className="w-full h-[400px] object-cover rounded-lg mb-6"
                        />
                    ) : (
                        <div className="w-full h-[400px] bg-gray-300 rounded-lg mb-6 flex items-center justify-center">
                            <span className="text-gray-500">No Image Available</span>
                        </div>
                    )}
                    <h2 className="text-3xl font-semibold mb-4">{blogData.title}</h2>
                    <p className="text-gray-700 text-lg leading-relaxed">{blogData.content}</p>
                    <p className='text-gray-700 text-lg leading-relaxed'>Author: {blogData.author}</p>
                </div>

                <aside className="w-full lg:w-1/4 bg-white p-6 rounded-lg shadow-lg lg:sticky lg:top-20">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Related Posts</h3>
                    <ul className="space-y-3">
                        <li>
                            <Link to="/" className="text-blue-600 hover:underline">Exploring React Hooks</Link>
                        </li>
                        <li>
                            <Link to="/" className="text-blue-600 hover:underline">JavaScript ES6 Features</Link>
                        </li>
                    </ul>
                </aside>
            </div>

            <div className="mt-10 mb-6">
                <Link to="/blogs" className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-500 transition-colors">
                    &larr; Back to Blogs
                </Link>
            </div>
        </div>
    );
};

export default BlogDetail;

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Link } from 'react-router-dom';
const Blog = () => {

    const [blogs, setBlogs] = useState([]);
    // State for form fields
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [photo, setPhoto] = useState(null);
    const [formState, setFormState] = useState('none');
    const [searchQuery, setSearchQuery] = useState(''); // New state for search input

    // Fetch blogs based on search query
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`https://urbanfarm.onrender.comblogs?search=${searchQuery}`);
                setBlogs(response.data);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        };
        fetchBlogs();
    }, [searchQuery]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        let photoUrl = '';
    
        // Check if a photo is selected
        if (photo) {
            const formData = new FormData();
            formData.append('file', photo)
            formData.append('upload_preset', 'my_preset'); // Replace with your Cloudinary upload preset
    
            try {
                // Upload photo to Cloudinary
                const response = await axios.post(
                    'https://api.cloudinary.com/v1_1/db4hnhtfx/image/upload', // Replace 'your_cloud_name' with your Cloudinary cloud name
                    formData
                );
    
                // Get the URL of the uploaded image
                photoUrl = response.data.secure_url;
            } catch (error) {
                console.error('Error uploading to Cloudinary:', error);
                alert('An error occurred while uploading the image. Please try again.');
                return;
            }
        }
    
        try {
            // Create the blog object to send to the backend
            const blogData = {
                title,
                content,
                author: sessionStorage.getItem('token').split('#')[1].slice(0,-1),
                photolink: photoUrl, // Send the Cloudinary photo URL
            };
    
            // Send blog data to your backend
            const response = await fetch('https://urbanfarm.onrender.comadd-blog', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(blogData),
            });
    
            if (response.ok) {
                alert('Blog published successfully!');
                // Reset form
                setTitle('');
                setContent('');
                setPhoto(null);
            } else {
                alert('Failed to publish blog');
            }
        } catch (error) {
            console.error('Error submitting blog:', error);
            alert('An error occurred. Please try again.');
        }
    };
    
    return (
        <>
            <div className="flex mt-28 justify-center">
                <div className="relative w-full flex mx-5">
                    <FontAwesomeIcon
                        icon={faSearch}
                        className="absolute left-3 top-[15px] transform -translate-y-1/2 text-gray-400"
                    />
                    <input
                        className="w-full rounded-xl mx-auto border-[1px] outline-none border-gray-400 h-10 pl-10 "
                        placeholder="search blogs"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>
            <div className='w-full flex justify-end'>
                <button onClick={() => { setFormState('block') }} className="p-2 rounded-lg border-[1px] bg-green-500 border-black mx-5 my-2 flex justify-between w-fit hover:bg-green-400">
                    <div className='mr-2 font-bold text-md h-fit'>Write a blog</div>
                    <FontAwesomeIcon icon={faPlus} className='my-auto' />
                </button>
            </div>
            {/* Blog Form */}
            <form onSubmit={handleSubmit} className=" w-fit  mx-auto bg-white shadow-lg rounded-lg p-5 mt-5" style={{ display: formState }}>
                

                {/* Blog Photo */}
                <div className="mb-4">
                    <label className="block font-semibold mb-2">Upload Blog Photo</label>
                    <input
                        type="file"
                        className="w-full border border-gray-300 p-2 rounded-lg"
                        onChange={(e) => setPhoto(e.target.files[0])}
                    />
                </div>

                {/* Blog Title */}
                <div className="mb-4 mr-5">
                    <label className="block font-semibold mb-2">Blog Title</label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 p-2 rounded-lg outline-none"
                        placeholder="Enter your blog title here"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                {/* Blog Content */}
                <div className="mb-4 mr">
                    <label className="block font-semibold mb-2">Blog Content</label>
                    <textarea
                        className="w-[900px] border border-gray-300 p-2 rounded-lg h-40 outline-none"
                        placeholder="Write your blog content here..."
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>

                {/* Submit Button */}
                <div className="flex justify-between">
                    <button type='button' onClick={() => { setFormState('none') }} className="px-4 py-2 bg-red-400 text-black border-[1px] font-semibold rounded-lg hover:bg-red-500">
                        Close
                    </button>
                    <button type='submit' className="px-4 py-2 bg-green-500 text-black border-[1px] font-semibold rounded-lg hover:bg-green-400">
                        Publish Blog
                    </button>
                </div>
            </form>
            {/* Displaying all blogs */}
            <div className="mt-10 mx-5">
                <h2 className="text-xl font-bold mb-4">All Blogs</h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {blogs.map(blog => (
                        <div key={blog._id} className="p-4 border-[1px] rounded-lg shadow-lg transition-transform duration-200 transform"
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >

                            <img src={blog.photolink} alt="Blog" className="w-full h-40 object-cover rounded-lg mb-4" />
                            <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>
                            <p className="text-gray-600">{blog.content.slice(0, 100)}...</p>
                            <p className='text-gray-600 text-sm '>Author: {blog.author}</p>
                            <div className='flex justify-end'>
                                <Link
                                    className='no-underline'
                                    to={{
                                        pathname: `/blog/${blog._id}`,
                                        state: {
                                            photo: blog.photoPath,
                                            title: blog.title,
                                            content: blog.content
                                        }
                                    }}
                                >
                                    <button className="p-2 rounded-lg border-[1px] bg-blue-300 border-black mx-5 my-2 flex text-md font-bold justify-between w-fit hover:bg-blue-400">Read more</button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div >
        </>
    )
}

export default Blog;

import './App.css'
import { useState,useEffect } from 'react'

function App() {
  //use state to strore the post
  const [posts, setPosts] = useState([])
  //state for Loading behaviour 
  const [loading, setLoading] = useState(true)
    //use state for error handling
  const[error,setError] = useState(null)
  
  //state for search fuctionality
  const[searchTerm,setSearchTerm]=useState('')

  // New state to show form loading status
  const[showForm,setShowForm] = useState(false)
  const [newPost, setNewPost] = useState({
    title: '',
    body: '',
    userId: 1
  })

  //state for form submission
  const [submitting,setSubmitting] = useState(false)

  //state for Editing fuctionality
  const [editingPost, setEditingPost] = useState(null)
  const[EditForm,setEditForm] = useState({
    title: '',
    body: ''
  })
  const [updating,setUpdating] = useState(false);



  //use effect to fetch post data when component mounts
  useEffect(()=>{
    fetchPosts()
  },[]);

 //fuction to fetch all post from API
    const fetchPosts = async()=>{
      try{
        setLoading(true) //set loading to true before fetching data
        //clear any previous error
        setError(null)
        //fetch data from API
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');  

        //check the response is successful or not
        if(!response.ok){
          setError("Failed to fetch posts. Please try again later.")
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        //convert response to json
        const data = await response.json();
        //update the posts state with fetched data
        setPosts(data)
        setLoading(false) //set loading to false after data is fetched  
        
      }
      catch(error){
        //if any error occurs during fetching, set the error state
        setError("Failed to fetch posts. Please try again later.")
        console.error("Error fetching posts:", error)
      }
      finally{
        setLoading(false) //set loading to false in finally block to ensure it runs regardless of success or failure
      }
    };
    //Fuction to create a new post 
    const createPost= async(postData)=>{
      try{
        //set submitting to true when form submission starts
        setSubmitting(true)
        //clear any previous error
        setError(null)
        //send POST request to API to create a new post
        const response =await fetch('https://jsonplaceholder.typicode.com/posts',{
          method:'POST',
          headers:{
            'Content-Type':'application/json'},
            body:JSON.stringify(postData)
        });
        //check if the response is successful
        if(!response.ok){
          setError("Failed to create post. Please try again later.")
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        //Get the created post data from response
        const createdPost = await response.json();

        //Add the create post to the beginning of the posts array
        setPosts(previewvPosts=>[createdPost,...previewvPosts])

        //Rest the new post form
        setNewPost({
          title: '',
          body: '',
          userId: 1
        })
        //Hide the form after successful submission
        setShowForm(false)
        console.log("Post created successfully:", createdPost)
      }
      catch(error){
        setError("Failed to create post. Please try again later.")
        console.error("Error creating post:", error)
      }
      finally{
        setSubmitting(false) //set submitting to false in finally block to ensure it runs regardless of success or failure
      }
    }
    //fuction to handle form submission
    const handleFormSubmission=(e)=>
{
  e.preventDefault() //prevent default form submission behaviour

  //validate form inputs
  if(!newPost.title.trim()||!newPost.body.trim()){
    setError("Title and body are required.")
    return;
  }
    //clear value of error state if validation passes
    setError(null)

    //call createPost function to create a new post
    createPost(newPost)
  };

  //Fuction to handle input change in form fields
  const handleInputChange=(fields,value)=>{
    setNewPost(prevPost=>({
      ...prevPost,
      [fields]:value
    }))
  }
  //Fuction to delete a post
  const deletePost = async(PostId)=>{

    try{
      setError(null) //clear any previous error
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${PostId}`,{
        method:'DELETE'
      })  
      if(!response.ok){
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      //remove the deleted post from the posts array
      setPosts(prevPosts=>prevPosts.filter(post=>post.id!==PostId))
      console.log(`Post with ID ${PostId} deleted successfully.`)
    }
    catch(err){
      setError("Failed to delete post. Please try again later.")
      console.error("Error deleting post:", err)

    }
    finally {
      setSubmitting(false) //set submitting to false in finally block to ensure it runs regardless of success or failure
    }
   };
   //Function to handle delet with confirmation
   const handleDelete =(post)=>{

    //show a confirmation dialog before deleting the post
    const confirmDelete =window.confirm(`Are you sure you want to delete this post? ${post.title}`)
    if(confirmDelete){
      deletePost(post.id)
    }
    else{
      console.log('Post deletion cancelled.')
    }

   }
   //Fuction to upate a post 

   const updatePost = async(postId,updatedData)=>{
    try{
      setUpdating(true) //set updating to true when update starts
      setError(null) //clear any previous error

      const response =await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`,
        {method:'PUT',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({id:postId,...updatedData,userId:1})}
      );
      if(!response.ok){
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedPost = await response.json();

      //Update the post in the posts array
      setPosts(prevPosts=>prevPosts.map(post=>post.id===postId?{...post,...updatedData}:post)
    );

    //Exit editing mode after successful update
    setEditingPost(null)
    setEditForm({
      title: '',
      body: ''
    })
    console.log("Post updated successfully:", updatedPost)
  }
       
      catch(error){
        setError("Failed to update post. Please try again later.")
        console.error("Error updating post:", error)
      }
      finally{
        setUpdating(false) //set updating to false in finally block to ensure it runs regardless of success or failure
      }
     };
  
    //Fuction to start editing a post
    const startEditing =(post)=>{
      setEditingPost(post.id);
      setEditForm({
        title:post.title,
        body:post.body
      })
    };
    //fuction to cancel the editing post
    const cancelEditingPost =()=>{
      setEditingPost(null);
      setEditForm({title:"",body:''})
    }
  
    //fuction to submit edit
    const submitEdit =()=>{
      if(!EditForm.title.trim()|| !EditForm.body.trim()){
        setError("Fill the form");
        return;
      }
      updatePost(editingPost,EditForm);
    };


  return (
      
    <div className="App">

      <header className='App-header'>
        
        <h1>Posts Manager</h1>
        <p>Manage your blog post with full operations </p>
         
      </header>
      <div className='add-post-section'>
        <button className='toggle-form-btn'
         onClick={()=>setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add New Post'}
         </button>
          {showForm && (
            <form className='post-form' onSubmit={handleFormSubmission}>
              <h3>Create a New Post</h3>
              <div className='form-group'>
                <label htmlFor='title'>Title:</label>
                <input 
                type='text'
                id='title'
                value={newPost.title}
                onChange={(e)=>handleInputChange('title',e.target.value)}
                placeholder='Enter post title'
                disabled={submitting}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='body'>Body:</label>
                <textarea 
                id='body'
                value={newPost.body}
                onChange={(e)=>handleInputChange('body',e.target.value)}
                placeholder='Enter post body'
                rows='4' 
                disabled={submitting}
                />
              </div>
              <div className='form-actions' >
              <button type='submit' disabled={submitting||!newPost.title.trim()||!newPost.body.trim()}
              className='submit-btn'
              >
                {submitting ? 'Submitting...' : 'Create Post'}
              </button>
              <button type='button' onClick={()=>setShowForm(false)} disabled={submitting} className='cancel-btn'>
                Cancel
              </button>
              </div>
            </form>
          )}
      </div>

         {loading && (
           <div className='loading'>
            <h2>Loading posts.. </h2>
            <p>Please wait while we fetch the data </p>
            </div>
          )}

          {error && 
          (<div className='error'>
            <h2>Error occur</h2>
            <p>{error}</p> 
            <button onClick={fetchPosts}>Try Again</button> 
            </div>
            )}
            {!loading && !error && (
              <div className='posts-container'> 
              <h2>All Posts({posts.length}) </h2> 
               {posts.length === 0 ? (
                <p>No posts available.</p>
              ):(
                <div className='posts-grid'>
                  {posts.map(post=>(
                    <div key={post.id} className='post-card'>
                      {editingPost===post.id?(
                        <div className='edit-form'>
                          <input type ="Text" 
                          value={EditForm.title}
                          onChange={(e)=>setEditForm(prev=>({...prev,title:e.target.value}))}
                          className='edit-input'
                          disabled={updating}
                          />
                          <textarea 
                          value={EditForm.body}
                          onChange={(e)=>setEditForm(prev=>({...prev,body:e.target.value}))}
                          className='edit-textarea'
                          rows={4}
                          disabled ={updating}

                          />
                          <div className='edit-action'>
                            <button onClick={submitEdit}
                            disabled ={updating||!EditForm.title.trim()||!EditForm.body.trim() }
                            className='save-btn'
                            > 
                              {updating?'Saving...':'Save'}
                            </button>
                            <button onClick={cancelEditingPost}
                            disabled ={updating}
                            className='cancel-editing-btn'>
                              
                              Cancel</button>
                              </div>

                           </div>
                      ):(
                      <div>
                        <div className='post-header'>
                           <h3>{post.title}</h3>
                           <div className='post-actions'>
                          <button onClick={()=>handleDelete(post)} className='delete-btn'>Delete</button>
                          <button onClick={()=>startEditing(post)}
                          title='Edit this post'
                          className='Edit-btn'>Edit</button>
                        </div>
                        </div>
                        <p>{post.body}</p>
                        <small>Post ID: {post.id}| user ID: {post.userId}</small>
                      </div>
                      )}
                    </div>
                  ))}
                  </div>

                )}
               </div>
                
              )}
    </div>
  )
}

export default App


import React, { useState } from 'react';

const AddInformationForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [favorite, setFavorite] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessages, setErrorMessages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform form validation
    const errors = [];
    if (!title.trim()) {
      errors.push("Title is required");
    }
    if (!author.trim()) {
      errors.push("Author is required");
    }
    if (errors.length > 0) {
      setErrorMessages(errors);
      return;
    }

    // Save data to JSON file
    try {
      const newBook = { title, author, favorite };
      // Make HTTP request to save data
      const response = await fetch('your-save-endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBook),
      });
      if (response.ok) {
        setSuccessMessage('File saved successfully');
        setTitle('');
        setAuthor('');
        setFavorite(false);
        setErrorMessages([]);
      } else {
        throw new Error('Failed to save data');
      }
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Add New Book</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title:</label>
                  <input type="text" id="title" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="author" className="form-label">Author:</label>
                  <input type="text" id="author" className="form-control" value={author} onChange={(e) => setAuthor(e.target.value)} required />
                </div>
                <div className="mb-3 form-check">
                  <input type="checkbox" id="favorite" className="form-check-input" checked={favorite} onChange={(e) => setFavorite(e.target.checked)} />
                  <label htmlFor="favorite" className="form-check-label">Favorite</label>
                </div>
                <button type="submit" className="btn btn-primary">Add</button>
              </form>
              {errorMessages.length > 0 && (
                <ul className="text-danger">
                  {errorMessages.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              )}
              {successMessage && <p className="text-success text-center mt-3">{successMessage}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddInformationForm;

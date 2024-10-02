import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

// Set the app element for accessibility
Modal.setAppElement('#root');

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [segmentName, setSegmentName] = useState('');
  const [schemas, setSchemas] = useState([]);
  const [selectedSchema, setSelectedSchema] = useState('');

  // Initial schema options
  const schemaOptions = [
    { label: 'First Name', value: 'first_name', type: 'user' },
    { label: 'Last Name', value: 'last_name', type: 'user' },
    { label: 'Gender', value: 'gender', type: 'user' },
    { label: 'Age', value: 'age', type: 'user' },
    { label: 'Account Name', value: 'account_name', type: 'group' },
    { label: 'City', value: 'city', type: 'user' },
    { label: 'State', value: 'state', type: 'user' }
  ];

  // Handle segment name input change
  const handleSegmentNameChange = (e) => {
    setSegmentName(e.target.value);
  };

  // Handle schema selection change
  const handleSchemaChange = (e) => {
    setSelectedSchema(e.target.value);
  };

  // Add new schema to the list
  const addNewSchema = () => {
    if (selectedSchema) {
      const selectedOption = schemaOptions.find(option => option.value === selectedSchema);
      setSchemas([...schemas, selectedOption]);
      setSelectedSchema(''); // Reset selection
    }
  };

  // Save segment and send data to the server
  const saveSegment = async () => {
    const data = {
      segment_name: segmentName,
      schema: schemas.map(schema => ({ [schema.value]: schema.label }))
    };

    try {
      const response = await axios.post('http://localhost:5000/save-segment', data);
      alert('Segment saved successfully!');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      closeModal();
    }
  };

  // Close modal
  const closeModal = () => {
    setIsOpen(false);
    setSegmentName('');
    setSchemas([]);
    setSelectedSchema('');
  };

  // Custom styles for the modal
  const customStyles = {
    content: {
      top: '0',
      left: 'auto',
      right: '0',
      bottom: '0',
      transform: 'none',
      width: '400px', // Adjust the width of the modal if needed
      padding: '20px',
      height: '100vh', // Full height
      overflowY: 'auto', // Scroll if content exceeds height
      backgroundColor: '#f4f4f9', // Soft background color
      border: '1px solid #ccc',
    },
  };

  return (
    <div style={{ padding: '20px' }}>
      <button 
        onClick={() => setIsOpen(true)} 
        style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px' }}
      >
        Save Segment
      </button>

      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles} // Apply custom styles
      >
        <h2 style={{ color: '#333', marginBottom: '20px' }}>Save Segment</h2>
        
        <input
          type="text"
          value={segmentName}
          onChange={handleSegmentNameChange}
          placeholder="Segment Name"
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '20px',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        />
        
        <div style={{ marginBottom: '20px' }}>
          <label>Add schema to segment:</label>
          <select
            value={selectedSchema}
            onChange={handleSchemaChange}
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          >
            <option value="">Select schema</option>
            {schemaOptions.filter(option => !schemas.some(schema => schema.value === option.value)).map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          <button 
            onClick={addNewSchema} 
            style={{
              backgroundColor: '#28a745', 
              color: '#fff', 
              border: 'none', 
              padding: '10px', 
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            + Add new schema
          </button>
        </div>
        
        <div style={{ border: '1px solid blue', padding: '10px', marginBottom: '20px' }}>
          <h4>Added Schemas:</h4>
          {schemas.map((schema, index) => (
            <div key={index}>
              {schema.type === 'user' ? (
                <input type="radio" checked disabled style={{ marginRight: '10px', accentColor: 'green' }} />
              ) : (
                <input type="radio" checked disabled style={{ marginRight: '10px', accentColor: 'red' }} />
              )}
              {schema.label}
            </div>
          ))}
        </div>

        <button 
          onClick={saveSegment} 
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Save Segment
        </button>
      </Modal>
    </div>
  );
};

export default App;

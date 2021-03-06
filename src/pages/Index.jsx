import React, { Component } from 'react';
import axios from 'axios';
import FormData from 'form-data';

const Console = console;

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: null,
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onFormSubmit(e) {
    e.preventDefault();
    const { state } = this;
    const { files } = state;
    const formData = new FormData();
    const filearray = Object.values(files);
    filearray.forEach((file) => {
      formData.append('myImage', file);
    });
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    axios.post('/api/multer/upload', formData, config)
      .then((response) => {
        Console.log('The file is successfully uploaded');
        Console.log(response);
      }).catch((error) => {
        Console.log(error);
      });
  }

  onChange(e) {
    this.setState({ files: e.target.files });
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <h1>File Upload</h1>
        <input type="file" multiple name="myImage" onChange={this.onChange} />
        <button type="submit">Upload</button>
      </form>
    );
  }
}

import React, { Component } from 'react'
import meme from '../services/meme-service';

class Meme extends Component {

  state = {
    title: "",
    description: "",
    imageUrl: "",
    memes: [],
    disable: true,
  }

  componentDidMount() {
    meme.getAllMemes()
    .then((data) => {
      this.setState({
        memes: data
      })
    })
  }

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const {title, description, imageUrl} = this.state;
    meme.createMeme({title, description, imageUrl})
    .then((data) => {
      this.setState({
        memes: [...this.state.memes, data]
      })
    })
    .catch((error) => console.log(error))
  }

  fileOnchange = (event) => {
    const file = event.target.files[0];
    const uploadData = new FormData()
    uploadData.append('photo', file)

    meme.imageUpload(uploadData)
    .then((imageUrl) => {
      this.setState({
        imageUrl,
        disable: false,
      })
    })
    .catch((error) => console.log(error))
  }

  render() {
    const {title, description, memes, disable} = this.state
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label name="title">Title</label>
          <input type="text" value={title} name="title" onChange={this.handleChange}></input>
          <label name="description">Description</label>
          <input type="text" value={description} name="description" onChange={this.handleChange}></input>
          <label>Image</label>
          <input type="file" onChange={this.fileOnchange}></input>
          {disable ? <input type="submit" disabled></input> : <input type="submit"></input>}
        </form>
        {memes.map((meme) => {
          return (
            <div key={meme._id}>
              <h2>{meme.title}</h2>
              <p>{meme.description}</p>
              <img src={meme.imageUrl} alt="#"></img>
            </div>
          )
        })}
      </div>
    )
  }
}

export default Meme;

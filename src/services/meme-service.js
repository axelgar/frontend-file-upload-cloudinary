import axios from 'axios';

class MemeService {
  constructor() {
    this.meme = axios.create({
      baseURL: "http://localhost:4000/memes",
      withCredentials: true,
    })
  }

  createMeme(meme) {
    return this.meme.post('/', meme)
    .then(({data}) => data)
  }

  getAllMemes() {
    return this.meme.get('/')
    .then(({data}) => data)
  }

  imageUpload(file) {
    return this.meme.post('/image', file)
    .then(({data}) => data)
  }
}

const meme = new MemeService();

export default meme;
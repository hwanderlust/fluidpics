import React from 'react'

class Search extends React.PureComponent {

  state = {
    text: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  

  handleSubmit = (e) => {
    e.preventDefault()
    console.log(this.state.text)

    const url = `https://www.reddit.com/subreddits/search.json?q=${this.state.text}`
    const options = {
      method: 'GET'
    }

    fetch(url, options)
    .then(r => r.json())
    .then(console.log)
  }
  
  render() {

    return (
      <form onSubmit={this.handleSubmit}>
        <input type='text' className='search-bar' name='text' placeholder='search subreddits' value={this.state.text} onChange={this.handleChange} />
      </form>
    )
  }
}

export default Search
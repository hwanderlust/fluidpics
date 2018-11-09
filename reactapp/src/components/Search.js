import React from 'react'

class Search extends React.PureComponent {

  state = {
    text: ''
  }

  handleChange = (e) => {
    this.setState({
      text: e.target.value
    })
  }
  

  handleSubmit = (e) => {
    e.preventDefault()
    console.log(this.state.text)
  }
  
  render() {

    return (
      <form onSubmit={this.handleSubmit}>
        <input type='text' className='search-bar' placeholder='search subreddits' value={this.state.text} onChange={this.handleChange} />
      </form>
    )
  }
}

export default Search
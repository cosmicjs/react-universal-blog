// Work.js
import React from 'react'
import _ from 'lodash'
import config from '../../config'

// Components
import WorkList from '../Partials/WorkList'
import WorkSingle from '../Partials/WorkSingle'

// Dispatcher
import AppDispatcher from '../../dispatcher/AppDispatcher'

export default class Work extends React.Component{

  componentWillMount(){
    this.getPageData()
  }

  componentDidMount(){
    const data = this.props.data
    document.title = config.site.title + ' | ' + data.page.title
  }

  getPageData(){
    AppDispatcher.dispatch({
      action: 'get-page-data',
      page_slug: 'work',
      post_slug: this.props.params.slug
    })
  }

  getMoreWorkItems(){
    AppDispatcher.dispatch({
      action: 'get-more-items'
    })
  }

  render(){

    const data = this.props.data
    const globals = data.globals
    const pages = data.pages
    let main_content

    if(!this.props.params.slug){

      main_content = <WorkList getMoreWorkItems={ this.getMoreWorkItems } data={ data }/>

    } else {

      const work_items = data.work_items

      // Get current page slug
      const slug = this.props.params.slug
      const work_items_object = _.indexBy(work_items, 'slug')
      const work_item = work_items_object[slug]

      main_content = <WorkSingle data={ data } work_item={ work_item }/>

    }

    return (
      <div id="workHome">
         { main_content }
      </div>
    )
  }
}

export default Work;

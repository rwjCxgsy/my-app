import React, {Component} from 'react'

import styles from './list.module.less'

export default class List extends Component {
    render () {
        const {list = []} = this.props
        return ( 
            <>
                {
                    list.map((v, i) => {
                        return <div className={styles.list} key={i}>
                            <section>
                                <div className={styles.imgs}>
                                    <img src={v.thumbnail_pic_s} alt=""/>
                                </div>
                                <a href={v.url} target="__blank">{v.title}</a>
                                <cite>{v.author_name}</cite>
                                <span>{v.date}</span>
                            </section>
                        </div>
                    })
                }
            </>
        )
    }
}
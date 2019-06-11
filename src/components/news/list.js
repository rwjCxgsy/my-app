import React, {Component} from 'react'
import className from 'classnames'

import styles from './list.module.less'

export default class List extends Component {
    render () {
        const {list = []} = this.props
        return ( 
            <>
                {
                    list.map((v, i) => {
                        return <div className={className({
                            [styles.list]: true,
                            [styles['no-data']]: v === 0
                        })} 
                        ref={e => {
                            if (document.documentElement.offsetWidth < 1600) {
                                e && (e.style.width = '23%')
                            }
                        }}
                        key={i}>
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

    componentDidMount () {
        window.addEventListener('resize', () => {
            const list = document.getElementsByClassName(styles.list)
            Array.prototype.forEach.call(list, (e) => {
                e.style.width = document.documentElement.offsetWidth < 1600 ? '23%' : '18%'
            })
        })
    }
}
import Link from "next/link";
import styles from './css/Search.module.css'
import LogButton from './Login'
import { React, useState } from "react";
import useSWR from 'swr'

const fetcher = async (url) => {
    const res = await fetch(url);

    if (res.status !== 200) {
        throw new Error("No !")
    }
    const data = await res.json()

    return data
}

function getDate(timestamp) {
    const date = new Date(timestamp)
    return String(date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear())
  }

export default function Search(value) {

    const { data } = useSWR(`api/film/getall/${value.input}`, fetcher)

    return (
        <div>
            {data ? data.map(item => (
                <div className={styles.result_recherche_div}>
                    <Link href={"/film/" + item.id} passHref>
                        <a href={"/film/" + item.id} rel="noreferrer" className={styles.link_film}>
                            <div className={styles.div_film_style_film}>
                                <img src={item.image} alt="film" />
                                <div>
                                    <h1>{item.title}</h1>
                                    <h2>{item.description}</h2>
                                    <h3>{getDate(item.releaseDate)}</h3>
                                    <h4>Acteurs : {item.actors}</h4>
                                </div>
                            </div>
                        </a>
                    </Link>
                </div>
            )) : ''}
        </div>
    )
}
import React from "react"

function Title01(props) {
    return (
        <div className="title">
            <h1
                style={styles.title01}
            >{props.title}</h1>
        </div>
    )
}

const Title02 = (props) => {
    return (
        <div className="title">
            <h1
                style={styles.title02}
            >{props.title}</h1>
        </div>
    )
}

const styles = ({
    title01: {
        color: "#c0392b"
    },
    title02: {
        color: "#2980b9"
    }
})

export default {
    Title01,
    Title02
}
import style from './Loading.module.css'

const Loading = () => {
    return (
        <div className={style.Loading}>
            <p className={style.loadingText} >
                Loading...
            </p>
        </div>
    )
}
export default Loading;
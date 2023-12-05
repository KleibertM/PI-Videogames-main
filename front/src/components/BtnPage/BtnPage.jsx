const BtnPage = ({ name, onClick, active }) => (
    <div className={`${style.btnIcon} ${active ? style.activeBtn : ''}`}>
        <button className={style.btn} name={name} onClick={onClick}>
            {name === 'prev' ? '<' : '>'}
        </button>
        <p className={style.btnText}>{name.charAt(0).toUpperCase() + name.slice(1)}</p>
    </div>
);

export default BtnPage;
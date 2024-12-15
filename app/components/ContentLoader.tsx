import { css } from '../../styled-system/css'

const ContentLoader = () => {
    return (
        <div className={css({ display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '10px', bg: '#deefff', aspectRatio: '16/9', animation: 'fade 0.5s infinite alternate' })}>
            <div className={css({ border: '4px solid #e0e0e0', borderTop: '4px solid #3498db', borderRadius: '50%', width: '50px', height: '50px', animation: 'spin 1s linear infinite' })}></div>
        </div>
    )
}

export default ContentLoader    
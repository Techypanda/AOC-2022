import { useNavigate } from "react-router-dom"

export function Header() {
    const navigate = useNavigate();
    return (
        <header className="pt-3 px-3">
            <h1 className='text-xl select-none cursor-pointer inline-block' onClick={() => navigate('/')}>AOC 2022 - Jonwrigt</h1>
            <h1 className='text-xs select-none cursor-pointer inline-block ml-4' onClick={() => navigate('/1')}>Challenge 1</h1>
            <h1 className='text-xs select-none cursor-pointer inline-block ml-4' onClick={() => navigate('/2')}>Challenge 2</h1>
            <hr />
        </header>
    )
}
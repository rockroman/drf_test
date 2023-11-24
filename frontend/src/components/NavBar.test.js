import { render } from "@testing-library/react"
import { BrowserRouter as Router } from "react-router-dom/cjs/react-router-dom.min"
import NavBar from "./NavBar"

TextDecoderStream('renders NavBar', ()=>{
    render(<Router>
        <NavBar/>
    </Router>)
})
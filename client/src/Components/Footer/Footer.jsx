import React from 'react'
import './styles.scss'
import {SiGithub,SiCodechef,SiCodeforces,SiLinkedin} from 'react-icons/si'

const Footer = () => {
  return (
    <footer className="footer">
                <div className="infoText">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima sapiente eos quasi aliquam! Similique enim ducimus cumque, quae debitis, quas aliquid ea eaque quia unde distinctio eos non, vitae maxime?Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae animi aspernatur, velit qui labore consectetur soluta quibusdam perferendis ullam voluptates, odit recusandae optio. Consequuntur libero, accusamus non velit suscipit voluptate. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores cum, in totam quas, exercitationem consequuntur eos ipsam, at fugit iusto consequatur ratione perspiciatis. Non, distinctio eos? Nostrum commodi quia voluptatem!
                </div>
                  
                <div className="socialIcons">
                    <span className="icon">
                        <SiGithub />
                    </span>
                    <span className="icon">
                        <SiLinkedin />
                    </span>
                    <span className="icon">
                        <SiCodeforces />
                    </span>
                    <span className="icon">
                        <SiCodechef />
                    </span>
                </div>
        </footer>
  )
}

export default Footer

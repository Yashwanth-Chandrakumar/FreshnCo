import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
export default function Mainfooter() {
    let dateon = new Date().getFullYear();
    return (
        <div className="footer">
            <div className='foot-div'>
                <h1 className="footer-text">Fresh & Co.</h1>
                <div className='foot-icon'>
                    <InstagramIcon style={{color:"var(--btncolor)"}}/>
                    <TwitterIcon style={{color:"var(--btncolor)"}}/>
                </div>
        </div>
        <div className='foot-links'>
        <ul className="footer-ref">
          <span>Quick links</span>
          <li>Quality Ref.</li>
          <li>Our Farmers</li>
          <li>Help</li>
          <li>Reference</li>
        </ul>
        <ul className="footer-ref">
          <span>About us</span>
          <li>Our Team</li>
          <li>Newsroom</li>
          <li>Security</li>
          <li>Privacy Policy</li>
          </ul>
          </div>
        <h4 className="copyright">&copy;Fresh & Co. {dateon}</h4>
      </div>
    );
  }
  
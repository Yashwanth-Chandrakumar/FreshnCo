

export default function PaymentCard() {
  return (
    <div>
      <div className="main-back">
        <div className="container m-auto bg-white p-5 bod-3">
          <div className="row">
            <div className="col-lg-8 col-md-12">
              <form>
                <div className="header flex-between flex-vertical-center">
                  <div className="flex-vertical-center">
                    <i className="ai-bitcoin-fill size-xl pr-sm f-main-color"></i>
                    <span className="title">
                      <strong>AceCoin</strong><span>Pay</span>
                    </span>
                  </div>
                </div>
                <div className="card-data flex-fill flex-vertical">
                  {/* ... (Rest of the form) */}
                </div>
                <div className="action flex-center">
                  <button type="submit" className="b-main-color pointer">
                    Pay Now
                  </button>
                </div>
              </form>
            </div>

            <div className="col-lg-4 col-md-12 py-5">
              <div></div>
              <div className="purchase-section flex-fill flex-vertical">
                <div className="card-mockup flex-vertical">
                  {/* ... (Card mockup details) */}
                </div>

                <ul className="purchase-props">
                  {/* ... (Purchase properties) */}
                </ul>
              </div>
              <div className="separation-line"></div>
              <div className="total-section flex-between flex-vertical-center">
                <div className="flex-fill flex-vertical">
                  <div className="total-label f-secondary-color">You have to Pay</div>
                  <div>
                    <strong>549</strong>
                    <small>.99 <span className="f-secondary-color">USD</span></small>
                  </div>
                </div>
                <i className="ai-coin size-lg"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

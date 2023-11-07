import React from "react";

//INTERNAL IMPORT
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import event1 from "../../Components/Sliders/EventsImages/event1.jpg";
import event2 from "../../Components/Sliders/EventsImages/event2.jpg";
import event3 from "../../Components/Sliders/EventsImages/event3.jpg";
import event4 from "../../Components/Sliders/EventsImages/event4.jpg";
import "./Events-page.css";
import Events from "../../Components/Sliders/Events";

function EventsPage() {
  return (
    <div>
      <Header />
      <section className="events-page-content">
        <Events />
        <div className="events-categories-text">Events by categories</div>
        <div className="events-page-container">
          <div className="create-new-event-container">
            <div className="event-content">
              <div>
                <img src={event1} className="event-container" />
                <img src={event2} className="event-container" />
                <img src={event3} className="event-container" />
                <img src={event4} className="event-container" />
                <img src={event1} className="event-container" />
                <img src={event2} className="event-container" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default EventsPage;



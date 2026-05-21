import React from "react";
import contactInfo from "@/data/contact-info";

const ContactMap = () => {
  return (
    <section className="scs-contact-map" aria-label="Store location map">
      <div className="scs-contact-map__inner">
        <div className="scs-contact-map__header">
          <p className="scs-contact-map__kicker">
            <span className="scs-contact-map__kicker-mark" aria-hidden="true" />
            Find us
          </p>
          <h2 className="scs-contact-map__title">Visit our location</h2>
          <p className="scs-contact-map__text">{contactInfo.addressDisplay}</p>
        </div>
        <div className="scs-contact-map__frame">
          <iframe
            src={contactInfo.mapEmbedUrl}
            title="Quick Pick Market location on Google Maps"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
};

export default ContactMap;

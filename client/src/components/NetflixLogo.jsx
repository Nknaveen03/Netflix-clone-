import React from 'react';

// Official Netflix wordmark red — rendered as inline SVG so no image file needed.
function NetflixLogo({ height = 40 }) {
  return (
    <svg
      viewBox="0 0 111 30"
      height={height}
      fill="#E50914"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Netflix"
      role="img"
    >
      <path d="M105.06 14.28L111 30c-1.75-.25-3.499-.563-5.28-.75l-3.919-10.763-4.032 10.238c-1.682-.188-3.345-.35-5.03-.513l6.2-15.998L93.195 0h5.049l3.6 9.338L105.747 0H111l-5.94 14.28zM90.04 0h-4.951v27.925c1.633.1 3.28.2 4.95.338V0zm-10.064 26.95c-4.524-.1-9.046-.1-13.57.05V0h4.988v22.5c2.888 0 5.793-.075 8.582-.063v4.513zM57.218 13.5H63.3V9.225H57.22V4.513h7.494V0H52.268v27.075c3.574.037 7.149.112 10.695.225v-4.525h-5.745V13.5zM47.177 0H42.2v17.363L35.499 0h-4.918v26.2c1.645.025 3.291.063 4.951.1V9.488L42.382 26.5c1.6.05 3.18.113 4.795.175V0zM23.546 0H18.57v26.325l4.976.05V0zM10.951 0H0v4.513h3.263V30c1.657 0 3.3 0 4.95.013V4.513h2.738V0z"/>
    </svg>
  );
}

export default NetflixLogo;

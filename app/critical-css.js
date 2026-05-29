// Компонент за вграждане на критичен CSS в главата на документа
export function CriticalCSS() {
  return (
    <style
      id="critical-css"
      dangerouslySetInnerHTML={{
        __html: `
          /* Критичен CSS за първоначално рендериране */
          body{margin:0;padding:0;font-family:"Roboto",system-ui,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeSpeed}.bg-gray-800{background-color:#1f2937}.text-white{color:#fff}.bg-white{background-color:#fff}.relative{position:relative}.max-w-7xl{max-width:80rem}.mx-auto{margin-left:auto;margin-right:auto}h1{margin:0;font-weight:600}.bg-gray-50{background-color:#f9fafb}.aspect-\\[6\\/5\\]{aspect-ratio:6/5}.rounded-2xl{border-radius:1rem}.object-cover{object-fit:cover}.w-full{width:100%}@media (min-width:1024px){.lg\\:flex-row{flex-direction:row}.lg\\:w-1\\/2{width:50%}}
          
          /* Премахнати LCP стилове, тъй като ID-тата не се използват */
          /*
          #hero-mobile-lcp {
            content-visibility: auto;
            contain-intrinsic-size: 640px 400px;
            display: block;
          }
          
          #hero-desktop-lcp {
            content-visibility: auto;
            contain-intrinsic-size: 955px 776px;
            display: block;
          }
          
          @media (max-width:640px) {
            #hero-mobile-lcp {
              display: block !important;
              visibility: visible !important;
            }
            #hero-desktop-lcp {
              display: none !important;
            }
          }
          
          @media (min-width:641px) {
            #hero-desktop-lcp {
              display: block !important;
              visibility: visible !important;
            }
            #hero-mobile-lcp {
              display: none !important;
            }
          }
          
          img#hero-mobile-lcp, img#hero-desktop-lcp {
            content-visibility: auto;
          }
          
          .lg\\:hidden .w-full {
            min-height: 400px; 
          }
          */
        `,
      }}
    />
  );
}

import { PageHeader } from "../components/PageHeader";
import { Section, Prose } from "../components/Section";
import { Gallery } from "../components/Gallery";
import { Link } from "../lib/nav";
import { GALLERY, GALLERY_COUNT } from "../content/gallery";
import { PERSON } from "../content/profile";

export function GalleryPage() {
  return (
    <>
      <PageHeader
        routeKey="gallery"
        lead={`Photographs of ${PERSON.fullName}, published with their captions and alt text so that image search and assistive technology can describe each one accurately.`}
        answer={{
          question: "What photographs of Md Mayeed Khan Shuvon are published?",
          answer: `${GALLERY_COUNT} photographs of Md Mayeed Khan Shuvon are published on this page: a front-facing outdoor portrait used as the primary profile image, a riverside photograph, a park photograph and a photograph taken against a stone wall. Each carries a descriptive caption and alt text, and each is described in the page's structured data as a schema.org ImageObject.`,
        }}
      />

      <Section
        id="album"
        eyebrow="01 · Album"
        title="Photographs"
        lead="Published by the subject for use in this profile. Originals are held privately; the versions shown here are resized for the web."
      >
        <Gallery eagerFirst />
      </Section>

      <Section id="about-images" eyebrow="02 · Use of these images" title="How these photographs may be used" variant="tinted">
        <Prose
          paragraphs={[
            `These photographs are published so that ${PERSON.fullName} can be recognised clearly in a professional context. The front-facing outdoor portrait is the primary profile image: it appears in the hero of this site, in the social sharing card, and as the image property of the schema.org Person entity that describes him.`,
            "Journalists, event organisers, employers and directory editors may reproduce the photographs with attribution to this site. They must not be cropped to remove context, altered, or presented in a way that implies endorsement of a product, service or political position. Requests for a higher-resolution original or for a different photograph should be made by email to shuvonkhan8947@gmail.com.",
            "Photographs are never published with an invented location or an invented date. Where a location has been confirmed it is stated in the caption; where it has not, no location is claimed.",
          ]}
        />
        <p className="section__more">
          <Link to="/about/">Read the full biography →</Link>
        </p>
      </Section>

      <Section id="image-index" eyebrow="03 · Image index" title="Descriptions of each photograph">
        <div className="table-wrap">
          <table className="table">
            <caption className="table__caption">
              Each published photograph of {PERSON.fullName}, with its caption and description
            </caption>
            <thead>
              <tr>
                <th scope="col">Photograph</th>
                <th scope="col">Caption</th>
                <th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
              {GALLERY.map((photo) => (
                <tr key={photo.id}>
                  <th scope="row">{photo.caption}</th>
                  <td>{photo.location || "Location not published"}</td>
                  <td>{photo.alt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </>
  );
}

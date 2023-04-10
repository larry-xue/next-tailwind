export default function TestSlug({ params }: { params: { slug: string } }) {
  return <div>Slug = {params.slug}</div>;
}

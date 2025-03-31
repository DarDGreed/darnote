import Link from "next/link"
export default function NavBar() {
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Project Info", href: "/info" }
  ]
  return (
    <header className="flex gap-8">
      {navLinks.map((link) => { return <Link href={link.href} key={link.name}>{link.name}</Link> })}
    </header>
  )
}
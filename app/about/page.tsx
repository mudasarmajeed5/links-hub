"use client"
import { useState } from "react"
import Link from "next/link"
import { FaLightbulb, FaUsers, FaRocket, FaCode } from "react-icons/fa"
import { MdSecurity, MdOutlineDesignServices, MdSpeed } from "react-icons/md"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navbar from "../components/Navbar"
export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("mission")

  const features = [
    {
      icon: <FaLightbulb className="h-6 w-6 text-[#2EF2FF]" />,
      title: "Simple & Intuitive",
      description: "Create your personalized link page in minutes with our user-friendly interface.",
    },
    {
      icon: <MdOutlineDesignServices className="h-6 w-6 text-[#2EF2FF]" />,
      title: "Customizable Themes",
      description: "Express your brand with our wide range of customizable themes and design options.",
    },
    {
      icon: <MdSecurity className="h-6 w-6 text-[#2EF2FF]" />,
      title: "Secure & Reliable",
      description: "Your data is protected with enterprise-grade security and 99.9% uptime.",
    },
    {
      icon: <MdSpeed className="h-6 w-6 text-[#2EF2FF]" />,
      title: "Lightning Fast",
      description: "Optimized for speed to ensure your visitors have a seamless experience.",
    },
    {
      icon: <FaUsers className="h-6 w-6 text-[#2EF2FF]" />,
      title: "Audience Insights",
      description: "Gain valuable insights about your audience with detailed analytics.",
    },
    {
      icon: <FaCode className="h-6 w-6 text-[#2EF2FF]" />,
      title: "Open Source",
      description: "Built with transparency and community collaboration at its core.",
    },
  ]

  const stats = [
    { value: "10K+", label: "Active Users" },
    { value: "500K+", label: "Links Created" },
    { value: "99.9%", label: "Uptime" },
    { value: "24/7", label: "Support" },
  ]

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#080D27" }}>
        <Navbar/>
      {/* Hero Section */}
      <section className="relative mt-32 py-20 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#3C52D9]/30 to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-gradient-to-tl from-[#2EF2FF]/20 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-[#2EF2FF] to-[#3C52D9] p-0.5">
                <div
                  className="w-full h-full rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#0C1838" }}
                >
                  <FaRocket className="h-8 w-8 text-[#2EF2FF]" />
                </div>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-[#2EF2FF] via-[#C8EA80] to-[#EAEDFF] bg-clip-text text-transparent">
              About Links Hub
            </h1>

            <p className="text-xl text-[#C4CBF5] mb-8 max-w-3xl mx-auto">
              Were on a mission to simplify link management and help creators, businesses, and individuals share their
              online presence effectively.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-gradient-to-r from-[#3C52D9] to-[#1959AD] hover:from-[#2EF2FF] hover:to-[#3C52D9] text-white">
                Get Started
              </Button>
              <Button variant="outline" className="border-[#3C52D9] text-[#2EF2FF] hover:bg-[#334679]">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="mission" className="w-full" onValueChange={setActiveTab}>
              <div className="flex justify-center mb-8">
                <TabsList className="bg-[#263466]">
                  <TabsTrigger
                    value="mission"
                    className={`data-[state=active]:bg-[#3C52D9] data-[state=active]:text-white ${activeTab === "mission" ? "text-white" : "text-[#C4CBF5]"}`}
                  >
                    Our Mission
                  </TabsTrigger>
                  <TabsTrigger
                    value="story"
                    className={`data-[state=active]:bg-[#3C52D9] data-[state=active]:text-white ${activeTab === "story" ? "text-white" : "text-[#C4CBF5]"}`}
                  >
                    Our Story
                  </TabsTrigger>
                  <TabsTrigger
                    value="values"
                    className={`data-[state=active]:bg-[#3C52D9] data-[state=active]:text-white ${activeTab === "values" ? "text-white" : "text-[#C4CBF5]"}`}
                  >
                    Our Values
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="mission" className="mt-0">
                <Card className="border-0 shadow-xl overflow-hidden" style={{ backgroundColor: "#0C1838" }}>
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-2">
                      <div className="p-8 md:p-12 flex items-center">
                        <div>
                          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#C8EA80]">Our Mission</h2>
                          <p className="text-[#C4CBF5] mb-6">
                            At Links Hub, our mission is to empower creators, businesses, and individuals with a simple
                            yet powerful platform to organize and share their online presence. We believe in making
                            technology accessible to everyone, regardless of technical expertise.
                          </p>
                          <p className="text-[#C4CBF5]">
                            We re committed to building an open-source solution that prioritizes user experience,
                            customization, and performance. By providing a platform thats both powerful and easy to
                            use, we help our users connect with their audience more effectively.
                          </p>
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-[#3C52D9] to-[#1959AD] p-8 md:p-12 flex items-center">
                        <div>
                          <h3 className="text-xl font-semibold mb-4 text-white">What We Strive For</h3>
                          <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                              <div className="mt-1 rounded-full p-1 bg-white/20">
                                <FaLightbulb className="h-4 w-4 text-[#2EF2FF]" />
                              </div>
                              <div>
                                <h4 className="font-medium text-[#C8EA80]">Simplicity</h4>
                                <p className="text-sm text-white/90">Making link management accessible to everyone</p>
                              </div>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="mt-1 rounded-full p-1 bg-white/20">
                                <FaUsers className="h-4 w-4 text-[#2EF2FF]" />
                              </div>
                              <div>
                                <h4 className="font-medium text-[#C8EA80]">Community</h4>
                                <p className="text-sm text-white/90">Building with and for our users</p>
                              </div>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="mt-1 rounded-full p-1 bg-white/20">
                                <FaCode className="h-4 w-4 text-[#2EF2FF]" />
                              </div>
                              <div>
                                <h4 className="font-medium text-[#C8EA80]">Innovation</h4>
                                <p className="text-sm text-white/90">Continuously improving and evolving</p>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="story" className="mt-0">
                <Card className="border-0 shadow-xl" style={{ backgroundColor: "#0C1838" }}>
                  <CardContent className="p-8 md:p-12">
                    <div className="max-w-3xl mx-auto">
                      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#C8EA80]">Our Story</h2>
                      <div className="space-y-6 text-[#C4CBF5]">
                        <p>
                          Links Hub began as a passion project by Mudassar Majeed, who recognized the need for a more
                          flexible and customizable link management solution. Frustrated by the limitations of existing
                          platforms, Mudassar set out to create an open-source alternative that would give users more
                          control over their online presence.
                        </p>
                        <p>
                          What started as a simple idea quickly gained traction in the developer community. Contributors
                          from around the world joined the project, bringing their unique perspectives and skills to
                          help shape Links Hub into what it is today.
                        </p>
                        <p>
                          Today, Links Hub serves thousands of users worldwide, from content creators and small
                          businesses to large organizations. We remain committed to our open-source roots while
                          continuously evolving to meet the needs of our diverse user base.
                        </p>
                        <div className="pt-4">
                          <h3 className="text-xl font-semibold mb-4 text-[#2EF2FF]">Our Timeline</h3>
                          <div className="space-y-6">
                            <div className="flex gap-4">
                              <div className="flex flex-col items-center">
                                <div
                                  className="rounded-full w-8 h-8 flex items-center justify-center"
                                  style={{ backgroundColor: "#263466" }}
                                >
                                  <div className="w-3 h-3 rounded-full bg-[#2EF2FF]"></div>
                                </div>
                                <div className="w-0.5 h-full bg-[#263466]"></div>
                              </div>
                              <div>
                                <h4 className="font-medium text-[#C8EA80]">2022</h4>
                                <p className="text-[#C4CBF5]">Initial concept and development begins</p>
                              </div>
                            </div>
                            <div className="flex gap-4">
                              <div className="flex flex-col items-center">
                                <div
                                  className="rounded-full w-8 h-8 flex items-center justify-center"
                                  style={{ backgroundColor: "#263466" }}
                                >
                                  <div className="w-3 h-3 rounded-full bg-[#2EF2FF]"></div>
                                </div>
                                <div className="w-0.5 h-full bg-[#263466]"></div>
                              </div>
                              <div>
                                <h4 className="font-medium text-[#C8EA80]">2023</h4>
                                <p className="text-[#C4CBF5]">Open-source release and community growth</p>
                              </div>
                            </div>
                            <div className="flex gap-4">
                              <div className="flex flex-col items-center">
                                <div
                                  className="rounded-full w-8 h-8 flex items-center justify-center"
                                  style={{ backgroundColor: "#263466" }}
                                >
                                  <div className="w-3 h-3 rounded-full bg-[#2EF2FF]"></div>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-medium text-[#C8EA80]">2024</h4>
                                <p className="text-[#C4CBF5]">Premium features launch and platform expansion</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="values" className="mt-0">
                <Card className="border-0 shadow-xl" style={{ backgroundColor: "#0C1838" }}>
                  <CardContent className="p-8 md:p-12">
                    <div className="max-w-3xl mx-auto">
                      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#C8EA80]">Our Values</h2>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="p-6 rounded-lg" style={{ backgroundColor: "#263466" }}>
                          <h3 className="text-xl font-semibold mb-3 text-[#2EF2FF]">Transparency</h3>
                          <p className="text-[#C4CBF5]">
                            We believe in being open about how we build and operate. Our open-source approach ensures
                            that users can see exactly how Links Hub works.
                          </p>
                        </div>
                        <div className="p-6 rounded-lg" style={{ backgroundColor: "#263466" }}>
                          <h3 className="text-xl font-semibold mb-3 text-[#2EF2FF]">User-Centric</h3>
                          <p className="text-[#C4CBF5]">
                            Every feature we develop is designed with our users in mind. We actively listen to feedback
                            and prioritize improvements that matter most.
                          </p>
                        </div>
                        <div className="p-6 rounded-lg" style={{ backgroundColor: "#263466" }}>
                          <h3 className="text-xl font-semibold mb-3 text-[#2EF2FF]">Accessibility</h3>
                          <p className="text-[#C4CBF5]">
                            Were committed to making Links Hub accessible to everyone, regardless of technical
                            expertise or background.
                          </p>
                        </div>
                        <div className="p-6 rounded-lg" style={{ backgroundColor: "#263466" }}>
                          <h3 className="text-xl font-semibold mb-3 text-[#2EF2FF]">Community</h3>
                          <p className="text-[#C4CBF5]">
                            We value the contributions of our community members and believe that collaboration leads to
                            better outcomes for everyone.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24" style={{ backgroundColor: "#0C1838" }}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#EAEDFF]">What Makes Us Different</h2>
            <p className="text-xl text-[#C4CBF5] max-w-3xl mx-auto">
              Links Hub combines powerful features with simplicity to provide the best link management experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg overflow-hidden" style={{ backgroundColor: "#263466" }}>
                <div className="h-1 bg-gradient-to-r from-[#2EF2FF] to-[#3C52D9]"></div>
                <CardContent className="p-6">
                  <div
                    className="rounded-full w-12 h-12 flex items-center justify-center mb-4"
                    style={{ backgroundColor: "#334679" }}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-[#C8EA80]">{feature.title}</h3>
                  <p className="text-[#C4CBF5]">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {stats.map((stat, index) => (
                <Card key={index} className="border-0 shadow-lg text-center" style={{ backgroundColor: "#0C1838" }}>
                  <CardContent className="p-6">
                    <div className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-[#2EF2FF] to-[#3C52D9] bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <p className="text-[#C4CBF5]">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>    

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <Card className="border-0 shadow-2xl overflow-hidden" style={{ backgroundColor: "#0C1838" }}>
              <CardContent className="p-0">
                <div className="grid md:grid-cols-2">
                  <div className="p-8 md:p-12">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#C8EA80]">Ready to get started?</h2>
                    <p className="text-[#C4CBF5] mb-6">
                      Join thousands of creators, businesses, and individuals who are already using Links Hub to manage
                      their online presence.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <Button className="bg-gradient-to-r from-[#3C52D9] to-[#1959AD] hover:from-[#2EF2FF] hover:to-[#3C52D9] text-white">
                        Get Started for Free
                      </Button>
                      <Button variant="outline" className="border-[#3C52D9] text-[#2EF2FF] hover:bg-[#334679]">
                        <Link href="/contact">Contact Sales</Link>
                      </Button>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-[#3C52D9] to-[#1959AD] p-8 md:p-12 flex items-center">
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-white">Why users love Links Hub</h3>
                      <div className="space-y-4">
                        <div className="bg-white/10 p-4 rounded-lg">
                          <p className="text-white/90 italic">
                            Links Hub has completely transformed how I share my content online. Its intuitive,
                            customizable, and looks amazing!
                          </p>
                          <p className="text-[#C8EA80] mt-2 font-medium">— Sarah K., Content Creator</p>
                        </div>
                        <div className="bg-white/10 p-4 rounded-lg">
                          <p className="text-white/90 italic">
                            As a developer, I appreciate the open-source nature and flexibility of Links Hub. Its
                            exactly what I was looking for.
                          </p>
                          <p className="text-[#C8EA80] mt-2 font-medium">— Mark T., Web Developer</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}


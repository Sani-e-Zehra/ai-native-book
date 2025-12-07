import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Dive into the Course Content
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Welcome to ${siteConfig.title}`}
      description="A comprehensive course covering the fundamentals to advanced concepts in Physical AI and Humanoid Robotics">
      <HomepageHeader />
      <main>
        <section className={styles.features}>
          <div className="container">
            <div className="row">
              <div className={`col col--4 ${styles.feature}`}>
                <div className={styles.featureImageContainer}>
                  <div className={styles.featureIcon}>🤖</div>
                </div>
                <h3>Physical AI Fundamentals</h3>
                <p>Understand the core principles of Physical AI and how they apply to humanoid robotics.</p>
              </div>
              <div className={`col col--4 ${styles.feature}`}>
                <div className={styles.featureImageContainer}>
                  <div className={styles.featureIcon}>🦾</div>
                </div>
                <h3>Humanoid Systems</h3>
                <p>Explore the design and control of complex humanoid robots with multiple degrees of freedom.</p>
              </div>
              <div className={`col col--4 ${styles.feature}`}>
                <div className={styles.featureImageContainer}>
                  <div className={styles.featureIcon}>🧠</div>
                </div>
                <h3>Advanced Control</h3>
                <p>Master cutting-edge control techniques for dynamic balance, locomotion, and manipulation.</p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.highlights}>
          <div className="container padding-horiz--md">
            <div className="row">
              <div className="col col--6">
                <h2>Why Study Physical AI & Humanoid Robotics?</h2>
                <p>
                  The field of Physical AI and Humanoid Robotics represents one of the most challenging 
                  and rewarding frontiers in robotics and artificial intelligence. Understanding the 
                  complex interplay between perception, cognition, and action in physical systems is 
                  essential for developing truly autonomous robots that can interact safely and 
                  effectively with humans and the environment.
                </p>
                <p>
                  This comprehensive course provides a deep dive into the theoretical foundations and 
                  practical implementation aspects of humanoid robotics, from fundamental principles 
                  to advanced applications.
                </p>
              </div>
              <div className="col col--6">
                <div className={styles.quoteCard}>
                  <p>
                    "The goal of humanoid robotics is not to create artificial humans, but to understand 
                    the principles of embodied intelligence and develop machines that can operate 
                    effectively in human environments."
                  </p>
                  <cite>— Leading Researchers in Physical AI</cite>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
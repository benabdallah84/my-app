import Head from "next/head";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

function newMeetupPage() {
  const router = useRouter();
  async function addMeetupHandler(entredData) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(entredData),
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    router.push("/");
  }
  return (
    <Fragment>
      <Head>
        <title>Add a New Meetups</title>
        <meta
          name="description"
          content="Add your own meetups and create amazing networking opportunities"
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  );
}
export default newMeetupPage;

import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
import React, { Fragment } from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.meet.title}</title>
        <meta name="description" content={props.meet.description} />
      </Head>
      <MeetupDetail
        image={props.meet.image}
        title={props.meet.title}
        address={props.meet.address}
        description={props.meet.description}
      />
    </Fragment>
  );
}
export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://slimane47:KMJcqzZ4cOZImzxK@cluster0.tjypi.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  // @ts-ignore
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();

  return {
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
    fallback: "blocking",
  };
}
export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://slimane47:berriane47@cluster0.tjypi.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const selectedmeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });
  client.close();

  return {
    props: {
      meet: {
        id: selectedmeetup._id.toString(),
        title: selectedmeetup.title,
        image: selectedmeetup.image,
        address: selectedmeetup.address,
        description: selectedmeetup.description,
      },
    },
  };
}
export default MeetupDetails;

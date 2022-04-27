import { formatDistance } from "date-fns";
import { off, onValue } from "firebase/database";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Comment, Header, Segment } from "semantic-ui-react";
import { createDataTree } from "../../app/common/util/util";
import {
  firebaseObjectToArray,
  getGroupChatRef,
} from "../../app/firestore/firebaseService";
import { listenToGroupChat } from "./chatActions";
import { CLEAR_COMMENTS } from "./chatContstants";
import GroupDetailedChatForm from "./GroupDetailedChatForm";

export default function GroupDetailedChat({ groupId }) {
  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.event); //引数はrootReducerで確認
  const { authenticated } = useSelector((state) => state.auth);
  const { currentUser } = useSelector((state) => state.auth);

  // const [showReplyForm, setShowReplyForm] = useState({
  //   open: false,
  //   commentId: null,
  // });

  // function handleCloseReplyForm() {
  //   setShowReplyForm({ open: false, commentId: null });
  // }

  useEffect(() => {
    onValue(getGroupChatRef(groupId), (snapshot) => {
      if (!snapshot.exists()) return;
      dispatch(listenToGroupChat(firebaseObjectToArray(snapshot.val())));
      return () => {
        dispatch({ type: CLEAR_COMMENTS });
        off(getGroupChatRef());
      };
    });
  }, [groupId, dispatch]);

  return (
    <>
      <Segment
        textAlign='center'
        attached='top'
        inverted
        color='teal'
        style={{ border: "none", width: 730 }}
      >
        <Header>チャットページ</Header>
      </Segment>

      {authenticated && (
        <Segment attached style={{ width: 730 }}>
          <GroupDetailedChatForm
            groupId={groupId}
            parentId={0}
            // closeForm={setShowReplyForm}
          />
          <Comment.Group style={{ margin: "auto", width: 730 }}>
            {createDataTree(comments).map((comment) => (
              <div key={`my${comment.id}`}>
                {comment.uid === currentUser.uid ? (
                  <Comment
                    style={{ marginLeft: "auto", width: 200 }}
                    key={`my${comment.id}`}
                  >
                    <Comment.Avatar
                      src={comment.photoURL || "/assets/user.png"}
                    />
                    <Comment.Content>
                      <Comment.Author>{comment.displayName}</Comment.Author>
                      <Comment.Metadata>
                        <div>{formatDistance(comment.date, new Date())}</div>
                      </Comment.Metadata>
                      <Comment.Text>
                        {comment.text.split("\n").map((text, i) => (
                          <span key={i}>
                            {text}
                            <br />
                          </span>
                        ))}
                      </Comment.Text>
                      <Comment.Actions>
                        {/* <Comment.Action
                      onClick={() =>
                        setShowReplyForm({ open: true, commentId: comment.id })
                      }
                    >
                      Reply
                    </Comment.Action> */}
                        {/* {showReplyForm.open &&
                      showReplyForm.commentId === comment.id && (
                        <GroupDetailedChatForm
                          groupId={groupId}
                          parentId={comment.id}
                          closeForm={handleCloseReplyForm}
                        />
                      )} */}
                      </Comment.Actions>
                    </Comment.Content>
                  </Comment>
                ) : (
                  <Comment
                    key={`other${comment.id}`}
                    style={{ marginRight: "auto", width: 200 }}
                  >
                    <Comment.Avatar
                      src={comment.photoURL || "/assets/user.png"}
                    />
                    <Comment.Content>
                      <Comment.Author>{comment.displayName}</Comment.Author>
                      <Comment.Metadata>
                        <div>{formatDistance(comment.date, new Date())}</div>
                      </Comment.Metadata>
                      <Comment.Text>
                        {comment.text.split("\n").map((text, i) => (
                          <span key={i}>
                            {text}
                            <br />
                          </span>
                        ))}
                      </Comment.Text>
                      <Comment.Actions>
                        {/* <Comment.Action
                      onClick={() =>
                        setShowReplyForm({ open: true, commentId: comment.id })
                      }
                    >
                      Reply
                    </Comment.Action> */}
                        {/* {showReplyForm.open &&
                      showReplyForm.commentId === comment.id && (
                        <GroupDetailedChatForm
                          groupId={groupId}
                          parentId={comment.id}
                          closeForm={handleCloseReplyForm}
                        />
                      )} */}
                      </Comment.Actions>
                    </Comment.Content>
                  </Comment>
                )}
              </div>
            ))}
          </Comment.Group>
        </Segment>
      )}
    </>
  );
}

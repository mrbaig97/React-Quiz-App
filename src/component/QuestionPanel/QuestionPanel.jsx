import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './QuestionPanel.css';


const useStyles = makeStyles({
  root: {
    width: 700,
    minHeight:350,
    maxHeight:400,
    textAlign:'left',
    padding:50,
    background : "transparent"

    
  },
  question:{
    color:'black',
    fontSize: '2rem',
  },

  
 
});

function QuestionPanel({question, nextQuestion, total, questionNo, progress, checkUserAnswer}) {
  const [answered,setAnswered] = useState('');
  const [message,setMessage]=useState(''); 
  
  const handleAnswer = (ans) =>{
    setAnswered(ans);
    checkUserAnswer(ans);
    if(decodeURIComponent(question['correct_answer'])===ans){
      setMessage('Correct!')
    }
    else{
      setMessage('InCorrect!')
    }

  }

 
  const classes = useStyles();
  return (
  <>

        <Card className={classes.root}>
          <CardActionArea>    
            <CardContent>
              <Typography variant="h5" component="h3">
                Question {questionNo} of {total}
             
              </Typography>
            
              <Divider/>
              <Typography className={classes.question}>
                {decodeURIComponent(question['question'])}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            { question['incorrect_answers'].map(key =>
                <Button className = 'option' variant={answered === decodeURIComponent(key)? "contained" :"outlined"} 
                        color="primary" key={decodeURIComponent(key)} 
                        onClick={()=>handleAnswer(decodeURIComponent(key))}
                        disabled={answered!==''?true : false}
                >
                        {decodeURIComponent(key)}
                </Button>
              )
            }
            <Button className = 'option' variant={answered === decodeURIComponent(question['correct_answer'])? "contained" :"outlined"} 
                    color="primary" key={decodeURIComponent(question['correct_answer'])} 
                    onClick={()=>handleAnswer(decodeURIComponent(question['correct_answer']))}
                    disabled={answered!==''?true : false}
            >
                  {decodeURIComponent(question['correct_answer'])}
            </Button>
          </CardActions>
          <Typography variant="h5" component="h3" className="message">
              {answered && message}
          </Typography>
            
          {answered!=='' && progress !==100? 
            <Button variant="contained" 
              className="next-button" 
              color="secondary" key="next" onClick={()=>{nextQuestion(); setAnswered('');}} 
              >
                Next Question
          </Button>
          
          : ''}
            

        </Card>
       
    </>
  );
}
export default  QuestionPanel;
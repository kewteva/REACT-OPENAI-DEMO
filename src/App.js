import React, { useState } from "react";
import { Button, Typography, TextField, Stack, Slider } from "@mui/material";
import { Configuration, OpenAIApi } from "openai";
import { Container } from "@mui/system";
const configuration = new Configuration({
  apiKey: process.env.REACT_APP_API_KEY,
});
const openai = new OpenAIApi(configuration);

const App = () => {
  const [req, changeReq] = useState("");
  const [res, changeRes] = useState("");
  const [loading, changeLoading] = useState(false);
  const [temperature, changeTemperature] = useState(0.3);

  const handleClick = async () => {
    try {
      changeLoading(true);
      const response = await openai.createCompletion("text-davinci-002", {
        prompt: `What are 5 key points I should know when studying ${req}?`,
        temperature: temperature,
        max_tokens: 150,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      console.log(response.data);
      changeRes(response.data.choices[0].text);
      changeLoading(false);
    } catch (err) {
      console.log(err);
      changeLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Stack spacing={2}>
        <TextField
          label="Prompt"
          variant="outlined"
          value={req}
          onChange={(e) => changeReq(e.target.value)}
        />
        <Typography>Temperature</Typography>

        <Slider
          value={temperature}
          valueLabelDisplay="auto"
          step={0.1}
          marks
          min={0}
          max={1}
          onChange={(e) => {
            changeTemperature(e.target.value);
          }}
        />

        <Button disabled={!req} variant="contained" onClick={handleClick}>
          Submit
        </Button>
        <Typography>{loading ? "Loading" : res}</Typography>
      </Stack>
    </Container>
  );
};

export default App;

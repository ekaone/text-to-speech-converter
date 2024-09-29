'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Slider } from '@/components/ui/slider'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function IndexPage() {
  const [apiKey, setApiKey] = useState('')
  const [text, setText] = useState('')
  const [voice, setVoice] = useState('alloy')
  const [format, setFormat] = useState('mp3')
  const [model, setModel] = useState('tts-1')
  const [loading, setLoading] = useState(false)
  const [audioUrl, setAudioUrl] = useState('')
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false)
  const [speed, setSpeed] = useState(1)
  const [promptingStyle, setPromptingStyle] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setAudioUrl('')

    try {
      const response = await fetch('https://api.openai.com/v1/audio/speech', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: model,
          input: text,
          voice: voice,
          response_format: format,
          speed: speed,
          ...(promptingStyle && { voice_preset: promptingStyle })
        })
      })

      if (!response.ok) {
        throw new Error('Failed to generate speech')
      }

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      console.log(url)
      setAudioUrl(url)
      toast.success('Speech generated successfully!')
    } catch (error) {
      console.error('Error:', error)
      toast.error(
        'Failed to generate speech. Please check your API key and try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='container mx-auto max-w-2xl p-4 py-10'>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <Label htmlFor='api-key' className='mb-4 block'>
            OpenAI API Key
          </Label>
          <Input
            id='api-key'
            type='password'
            value={apiKey}
            onChange={e => setApiKey(e.target.value)}
            placeholder='Enter your OpenAI API key'
            required
          />
        </div>
        <div>
          <Label htmlFor='text' className='mb-4 block'>
            Text to Convert
          </Label>
          <Textarea
            id='text'
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder='Enter the text you want to convert to speech'
            required
            rows={10}
          />
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <Label htmlFor='voice' className='mb-4 block'>
              Voice
            </Label>
            <Select value={voice} onValueChange={setVoice}>
              <SelectTrigger>
                <SelectValue placeholder='Select voice' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='alloy'>Alloy</SelectItem>
                <SelectItem value='echo'>Echo</SelectItem>
                <SelectItem value='fable'>Fable</SelectItem>
                <SelectItem value='onyx'>Onyx</SelectItem>
                <SelectItem value='nova'>Nova</SelectItem>
                <SelectItem value='shimmer'>Shimmer</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor='format' className='mb-4 block'>
              Format
            </Label>
            <Select value={format} onValueChange={setFormat}>
              <SelectTrigger>
                <SelectValue placeholder='Select format' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='mp3'>MP3</SelectItem>
                <SelectItem value='opus'>Opus</SelectItem>
                <SelectItem value='aac'>AAC</SelectItem>
                <SelectItem value='flac'>FLAC</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          <Label className='mb-4 block'>Model</Label>
          <RadioGroup
            value={model}
            onValueChange={setModel}
            className='flex space-x-4'
          >
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='tts-1' id='tts-1' />
              <Label htmlFor='tts-1'>TTS-1 (Standard)</Label>
            </div>
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='tts-1-hd' id='tts-1-hd' />
              <Label htmlFor='tts-1-hd'>TTS-1-HD (High Quality)</Label>
            </div>
          </RadioGroup>
        </div>
        <Collapsible open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
          <CollapsibleTrigger asChild>
            <Button
              variant='outline'
              className='flex w-full items-center justify-between'
            >
              Advanced Options
              {isAdvancedOpen ? (
                <ChevronUp className='h-4 w-4' />
              ) : (
                <ChevronDown className='h-4 w-4' />
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className='mt-4 space-y-4'>
            <div>
              <Label htmlFor='speed' className='mb-4 block'>
                Speed ({speed}x)
              </Label>
              <Slider
                id='speed'
                min={0.25}
                max={4.0}
                step={0.25}
                value={[speed]}
                onValueChange={value => setSpeed(value[0])}
              />
            </div>
            <div>
              <Label htmlFor='prompting-style' className='mb-4 block'>
                Prompting Style
              </Label>
              <Select value={promptingStyle} onValueChange={setPromptingStyle}>
                <SelectTrigger>
                  <SelectValue placeholder='Select prompting style' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='default'>Default</SelectItem>
                  <SelectItem value='announcer'>Announcer</SelectItem>
                  <SelectItem value='customer_service'>
                    Customer Service
                  </SelectItem>
                  <SelectItem value='narrator'>Narrator</SelectItem>
                  <SelectItem value='angry'>Angry</SelectItem>
                  <SelectItem value='cheerful'>Cheerful</SelectItem>
                  <SelectItem value='excited'>Excited</SelectItem>
                  <SelectItem value='friendly'>Friendly</SelectItem>
                  <SelectItem value='hopeful'>Hopeful</SelectItem>
                  <SelectItem value='sad'>Sad</SelectItem>
                  <SelectItem value='shouting'>Shouting</SelectItem>
                  <SelectItem value='terrified'>Terrified</SelectItem>
                  <SelectItem value='unfriendly'>Unfriendly</SelectItem>
                  <SelectItem value='whispering'>Whispering</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CollapsibleContent>
        </Collapsible>
        <Button type='submit' disabled={loading}>
          {loading ? 'Generating...' : 'Generate Speech'}
        </Button>
      </form>
      {audioUrl && (
        <div className='mt-4'>
          <audio controls src={audioUrl} className='mb-2 w-full' />
          <Button asChild className='w-full'>
            <a href={audioUrl} download={`speech.${format}`}>
              Download Audio
            </a>
          </Button>
        </div>
      )}
      <ToastContainer />
      <footer className='mt-8 text-center text-sm text-gray-500'>
        Voice generated by OpenAI{' '}
        <a
          href='https://x.com/twekaone'
          target='_blank'
          rel='noopener noreferrer'
          className='text-blue-500 hover:underline'
        >
          @twekaone
        </a>
      </footer>
    </div>
  )
}

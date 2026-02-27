"use client"

import { useEffect } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Loader2, Heart, User, Users, MessageSquare, Phone, Trash2, CheckCircle2, XCircle, FileText } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RSVPSuccessMessage } from "@/components/rsvp-success-message"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { rsvpSchema, type RSVPFormData } from "@/lib/rsvp-schema"

export function RSVPForm() {
  const form = useForm<RSVPFormData>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      nome: "",
      presenca: undefined,
      acompanhantes: 0,
      acompanhantesNomes: [],
      whatsapp: "",
      mensagem: "",
    },
  })

  const { control, handleSubmit, watch, setValue, reset, formState: { isSubmitting, isSubmitSuccessful } } = form

  const { fields, append, remove } = useFieldArray({
    control,
    name: "acompanhantesNomes",
  })

  const presenca = watch("presenca")
  const acompanhantes = watch("acompanhantes")

  // Sincroniza o fieldArray com o número de acompanhantes
  useEffect(() => {
    const count = Number(acompanhantes) || 0
    const currentCount = fields.length

    if (count > currentCount) {
      for (let i = currentCount; i < count; i++) {
        append({ nome: "" }, { shouldFocus: false })
      }
    } else if (count < currentCount) {
      for (let i = currentCount - 1; i >= count; i--) {
        remove(i)
      }
    }
  }, [acompanhantes, fields.length, append, remove])

  // Se presença = "nao", zera a quantidade de acompanhantes
  useEffect(() => {
    if (presenca === "nao") {
      setValue("acompanhantes", 0)
    }
  }, [presenca, setValue])

  async function onSubmit(data: RSVPFormData) {
    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: data.nome,
          presenca: data.presenca === "sim",
          acompanhantes: data.acompanhantes,
          acompanhantesNomes: data.acompanhantesNomes.map((acompanhante) => acompanhante.nome).filter(Boolean),
          whatsapp: data.whatsapp || undefined,
          mensagem: data.mensagem || undefined,
        }),
      })

      if (response.ok) {
        toast.success("Presença confirmada com sucesso!", {
          description: "Obrigada por confirmar. Nos vemos lá!",
        })
        // O formulário se mantém preenchido e "isSubmitSuccessful" entra em ação para exibir a tela de sucesso
      } else {
        const responseData = await response.json().catch(() => ({}))
        toast.error(responseData.message || "Algo deu errado. Tente novamente.")
      }
    } catch {
      toast.error("Erro de conexão. Verifique sua internet e tente novamente.")
    }
  }

  return (
    <section id="confirmar" className="scroll-mt-20 px-4 py-16 lg:py-24 relative overflow-hidden">
      {/* Decorações do plano de fundo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -z-10" />

      <div className="mx-auto max-w-2xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center justify-center mb-4 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">
            <Heart className="w-3 h-3 mr-1" /> Confirme sua presença
          </div>
          <h2 className="text-4xl font-bold text-foreground md:text-5xl mb-4">
            Estamos te esperando!
          </h2>
          <p className="mx-auto max-w-auto text-muted-foreground text-lg">
            Ficaremos muito felizes em celebrar esse momento especial com você.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <Card className="border-0 shadow-2xl bg-background/80 backdrop-blur-xl ring-1 ring-primary/10 gap-0">
            <CardHeader className="flex flex-row items-center gap-3 md:gap-5 pb-5 border-b border-primary/10 space-y-0">
              <div className="bg-primary p-3 rounded-2xl flex items-center justify-center shrink-0">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div className="text-left flex-1">
                <CardTitle className="text-lg md:text-2xl">Formulário de Confirmação</CardTitle>
                <CardDescription className="text-xs md:text-sm">Preencha os dados abaixo com carinho.</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="pt-5 px-6">
              <AnimatePresence mode="wait">
                {isSubmitSuccessful ? (
                  <RSVPSuccessMessage onReset={() => reset()} />
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <fieldset disabled={isSubmitting} className="space-y-8 disabled:opacity-80 transition-opacity">

                          {/* Nome */}
                          <FormField
                            control={form.control}
                            name="nome"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="flex items-center text-foreground/80 font-medium">
                                  <User className="w-4 h-4 mr-2 text-primary/70" />
                                  Nome completo <span className="text-primary ml-1">*</span>
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Luna Mendes Belmonte Dorilêo"
                                    {...field}
                                    className="bg-background/50 border-primary/20 h-12 px-4 rounded-lg focus-visible:ring-primary/30 transition-shadow"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {/* Presença */}
                          <FormField
                            control={form.control}
                            name="presenca"
                            render={({ field }) => (
                              <FormItem className="space-y-4">
                                <FormLabel className="text-foreground/80 font-medium">Você irá comparecer? <span className="text-primary">*</span></FormLabel>
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                                  >
                                    <FormItem>
                                      <FormLabel className="cursor-pointer block m-0 group">
                                        <FormControl>
                                          <RadioGroupItem value="sim" className="sr-only" />
                                        </FormControl>
                                        <div className={`border rounded-xl px-4 flex items-center justify-between transition-all duration-300 h-12 ${field.value === 'sim' ? 'border-primary bg-primary/5 ring-1 ring-primary/20' : field.value === 'nao' ? 'border-border opacity-40 saturate-50 group-hover:opacity-60 bg-background' : 'border-border hover:bg-muted/50'}`}>
                                          <span className={`font-medium text-sm flex items-center transition-colors ${field.value === 'sim' ? 'text-primary' : 'text-foreground/70'}`}>
                                            <CheckCircle2 className={`w-5 h-5 mr-2 transition-colors ${field.value === 'sim' ? 'text-primary' : 'text-muted-foreground'}`} />
                                            Sim, estarei lá!
                                          </span>
                                          <div className={`w-5 h-5 rounded-full border flex justify-center items-center transition-colors ${field.value === 'sim' ? 'border-primary/30' : 'border-border'}`}>
                                            <motion.div initial={false} animate={{ scale: field.value === 'sim' ? 1 : 0 }} className="w-2.5 h-2.5 rounded-full bg-primary" />
                                          </div>
                                        </div>
                                      </FormLabel>
                                    </FormItem>

                                    <FormItem>
                                      <FormLabel className="cursor-pointer block m-0 group">
                                        <FormControl>
                                          <RadioGroupItem value="nao" className="sr-only" />
                                        </FormControl>
                                        <div className={`border rounded-xl px-4 flex items-center justify-between transition-all duration-300 h-12 ${field.value === 'nao' ? 'border-foreground/30 bg-foreground/5 ring-1 ring-border/30' : field.value === 'sim' ? 'border-border opacity-40 saturate-50 group-hover:opacity-60 bg-background' : 'border-border hover:bg-muted/50'}`}>
                                          <span className={`font-medium text-sm flex items-center transition-colors ${field.value === 'nao' ? 'text-foreground' : 'text-muted-foreground'}`}>
                                            <XCircle className={`w-5 h-5 mr-2 transition-colors ${field.value === 'nao' ? 'text-foreground/70' : 'text-muted-foreground/70'}`} />
                                            Não poderei ir
                                          </span>
                                          <div className={`w-5 h-5 rounded-full border flex justify-center items-center transition-colors ${field.value === 'nao' ? 'border-foreground/30' : 'border-border'}`}>
                                            <motion.div initial={false} animate={{ scale: field.value === 'nao' ? 1 : 0 }} className="w-2.5 h-2.5 rounded-full bg-foreground/30" />
                                          </div>
                                        </div>
                                      </FormLabel>
                                    </FormItem>
                                  </RadioGroup>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {/* Acompanhantes */}
                          <AnimatePresence>
                            {presenca === "sim" && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden space-y-4 px-2 -mx-2"
                              >
                                <FormField
                                  control={form.control}
                                  name="acompanhantes"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="flex items-center text-foreground/80 font-medium">
                                        <Users className="w-4 h-4 mr-2 text-primary/70" />
                                        Número de acompanhantes
                                      </FormLabel>
                                      <FormControl>
                                        <Input
                                          type="number"
                                          min={0}
                                          max={10}
                                          {...field}
                                          className="w-full md:w-32 bg-background/50 border-primary/20 h-12 px-4 rounded-lg text-center"
                                        />
                                      </FormControl>
                                      <FormDescription className="text-xs md:text-sm">Quantas pessoas irão com você (além de você)?</FormDescription>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                {/* Nomes dos Acompanhantes */}
                                {fields.length > 0 && (
                                  <div className="space-y-4">
                                    <AnimatePresence>
                                      {fields.map((fieldItem, index) => (
                                        <motion.div
                                          key={fieldItem.id}
                                          initial={{ opacity: 0, scale: 0.95 }}
                                          animate={{ opacity: 1, scale: 1 }}
                                          exit={{ opacity: 0, scale: 0.95 }}
                                          transition={{ duration: 0.2 }}
                                        >
                                          <FormField
                                            control={form.control}
                                            name={`acompanhantesNomes.${index}.nome`}
                                            render={({ field: nameField }) => (
                                              <FormItem>
                                                <div className="flex items-center gap-3">
                                                  <div className="flex-1 bg-primary/5 rounded-lg border border-primary/10 overflow-hidden px-4 h-12 flex items-center">
                                                    <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold mr-3 shrink-0">
                                                      {index + 1}
                                                    </div>
                                                    <FormControl>
                                                      <input
                                                        placeholder="Nome do acompanhante"
                                                        {...nameField}
                                                        className="bg-transparent border-0 focus:ring-0 text-sm flex-1 outline-none placeholder:text-muted-foreground w-full"
                                                      />
                                                    </FormControl>
                                                  </div>
                                                  <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-12 w-12 shrink-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10 hover:border-destructive/20 rounded-lg transition-colors"
                                                    onClick={() => {
                                                      remove(index)
                                                      setValue("acompanhantes", Math.max(0, (Number(acompanhantes) || 0) - 1))
                                                    }}
                                                    aria-label={`Remover acompanhante ${index + 1}`}
                                                  >
                                                    <Trash2 className="size-4" />
                                                  </Button>
                                                </div>
                                                <FormMessage />
                                              </FormItem>
                                            )}
                                          />
                                        </motion.div>
                                      ))}
                                    </AnimatePresence>
                                  </div>
                                )}
                              </motion.div>
                            )}
                          </AnimatePresence>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* WhatsApp */}
                            <FormField
                              control={form.control}
                              name="whatsapp"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="flex items-center text-foreground/80 font-medium">
                                    <Phone className="w-4 h-4 mr-2 text-primary/70" />
                                    WhatsApp <span className="text-primary ml-1">*</span>
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      type="tel"
                                      placeholder="(65) 99999-9999"
                                      {...field}
                                      className="bg-background/50 border-primary/20 h-12 px-4 rounded-lg"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          {/* Mensagem */}
                          <FormField
                            control={form.control}
                            name="mensagem"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="flex items-center text-foreground/80 font-medium">
                                  <MessageSquare className="w-4 h-4 mr-2 text-primary/70" />
                                  Mensagem <span className="text-muted-foreground ml-1 font-normal text-xs">(opcional)</span>
                                </FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Deixe uma mensagem carinhosa para nós..."
                                    {...field}
                                    className="bg-background/50 border-primary/20 min-h-[120px] p-4 rounded-lg resize-y"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {/* Submit */}
                          <div>
                            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                              <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full rounded-lg h-14 text-base font-semibold shadow-xl shadow-primary/20 text-white"
                                size="lg"
                              >
                                {isSubmitting ? (
                                  <>
                                    <Loader2 className="size-5 mr-2 animate-spin" />
                                    Enviando confirmação...
                                  </>
                                ) : (
                                  <>
                                    <Send className="size-5 mr-2" />
                                    Confirmar Presença
                                  </>
                                )}
                              </Button>
                            </motion.div>
                          </div>
                        </fieldset>
                      </form>
                    </Form>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

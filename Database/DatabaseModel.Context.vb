﻿'------------------------------------------------------------------------------
' <auto-generated>
'     This code was generated from a template.
'
'     Manual changes to this file may cause unexpected behavior in your application.
'     Manual changes to this file will be overwritten if the code is regenerated.
' </auto-generated>
'------------------------------------------------------------------------------

Imports System
Imports System.Data.Entity
Imports System.Data.Entity.Infrastructure

Partial Public Class KladionicaEntities
    Inherits DbContext

    Public Sub New()
        MyBase.New("name=KladionicaEntities")
    End Sub

    Protected Overrides Sub OnModelCreating(modelBuilder As DbModelBuilder)
        Throw New UnintentionalCodeFirstException()
    End Sub

    Public Overridable Property Bet() As DbSet(Of Bet)
    Public Overridable Property [Event]() As DbSet(Of [Event])
    Public Overridable Property List() As DbSet(Of List)
    Public Overridable Property Saldo() As DbSet(Of Saldo)
    Public Overridable Property Sport() As DbSet(Of Sport)
    Public Overridable Property Sublist() As DbSet(Of Sublist)
    Public Overridable Property Ticket() As DbSet(Of Ticket)
    Public Overridable Property TicketItem() As DbSet(Of TicketItem)

End Class
